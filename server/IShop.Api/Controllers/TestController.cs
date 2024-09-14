using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IShop.Api.Controllers;
[AllowAnonymous]
[Route("test")]
public class TestController() : ApiController
{
    [HttpGet]
    public async Task<bool> Wait(CancellationToken cancellationToken)
    {
        await Task.Delay(10000, cancellationToken);

        return true;
    }
}