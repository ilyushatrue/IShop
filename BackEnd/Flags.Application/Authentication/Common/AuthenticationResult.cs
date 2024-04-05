using Flags.Domain.User.Entities;

namespace Flags.Application.Authentication.Common;

public record AuthenticationResult(
    User User,
    string Token
);
