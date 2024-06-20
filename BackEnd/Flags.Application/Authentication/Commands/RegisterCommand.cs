namespace Flags.Application.Authentication.Commands;

public record RegisterCommand(
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Password,
    Guid? AvatarId);