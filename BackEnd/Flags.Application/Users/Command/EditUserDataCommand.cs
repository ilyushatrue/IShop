namespace Flags.Application.Users.Command;

public record EditUserDataCommand(
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    Guid? AvatarId);