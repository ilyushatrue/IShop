namespace Flags.Application.Authentication.Queries;

public record LoginByEmailQuery(
    string Email,
    string Password);