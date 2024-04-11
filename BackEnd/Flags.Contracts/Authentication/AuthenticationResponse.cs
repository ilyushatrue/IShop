namespace Flags.Contracts.Authentication;
public record AuthenticationResponse(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Token);
