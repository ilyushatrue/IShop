namespace Flags.Application.Authentication.Queries;

public record LoginByPhoneQuery(
    string Phone,
    string Password);