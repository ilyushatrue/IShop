using ErrorOr;
using Flags.Domain.Common.Errors;

namespace Flags.Domain.User.ValueObjects;

public class Password
{
	private const int MIN_LENGTH = 6;
	private const int MAX_LENGTH = 20;
	private Password(string value)
	{
		Value = value;
	}

	public string Value { get; private set; } = null!;

	public static ErrorOr<Password> Create(string input)
	{
		if (string.IsNullOrWhiteSpace(input))
			return Errors.Authentication.InvalidCredentials;

		var password = input.Trim();

		if (password.Length < MIN_LENGTH || password.Length > MAX_LENGTH)
			return Errors.Authentication.InvalidCredentials;

		return new Password(password);
	}
}