using ErrorOr;
using Flags.Api.Controllers;
using Flags.Application.Authentication.Commands.Register;
using Flags.Application.Authentication.Common;
using Flags.Application.Authentication.Queries.Login;
using Flags.Contracts.Authentication;
using Flags.Domain.Common.Errors;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flags.Api.Controller;

[Route("auth")]
[AllowAnonymous]
public class AuthenticationController(
    ISender mediator,
    IMapper mapper
    ) : ApiController
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command)
    {
        ErrorOr<AuthenticationResult> authResult = await mediator.Send(command);

        if (authResult.IsError && authResult.FirstError == Errors.Authentication.InvalidCredentials)
        {
            return Problem(
                statusCode: StatusCodes.Status401Unauthorized,
                title: authResult.FirstError.Description);
        }

        return authResult.Match(
            authResult => Ok(mapper.Map<AuthenticationResponse>(authResult)),
            errors => Problem(errors)
        );
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginQuery query)
    {
        var authResult = await mediator.Send(query);

        return authResult.Match(
            authResult => Ok(mapper.Map<AuthenticationResponse>(authResult)),
            errors => Problem(errors)
        );
    }
}
