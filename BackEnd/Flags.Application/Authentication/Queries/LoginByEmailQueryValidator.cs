using FluentValidation;

namespace Flags.Application.Authentication.Queries;

public class LoginByEmailQueryValidator : AbstractValidator<LoginByEmailQuery>
{
    public LoginByEmailQueryValidator()
    {
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
    }
}