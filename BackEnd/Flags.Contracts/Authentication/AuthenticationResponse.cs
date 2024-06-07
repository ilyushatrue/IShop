namespace Flags.Contracts.Authentication;
public record AuthenticationResponse(
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    Guid AvatarId);
