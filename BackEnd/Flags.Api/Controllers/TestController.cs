using Flags.Application.AppSettings;
using Flags.Application.Authentication.Common;
using Flags.Domain.Enums;
using Flags.Domain.UserRoot;
using Flags.Domain.UserRoot.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Flags.Api.Controllers;
[AllowAnonymous]
[Route("test")]
public class TestController() : ApiController
{
}