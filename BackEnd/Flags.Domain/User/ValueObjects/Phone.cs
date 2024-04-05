using System.Text.RegularExpressions;
using ErrorOr;
using Flags.Domain.Common.Errors;

namespace Flags.Domain.User.ValueObjects;

public class Phone
{
	private Phone(string value)
	{
		Value = value;
	}

	public string Value { get; private set; } = null!;
	public static ErrorOr<Phone> Create(string input, string[] existingPhones)
	{
		if (string.IsNullOrWhiteSpace(input))
			return Errors.Authentication.InvalidCredentials;

		var phone = input.Trim();

		if (!Regex.IsMatch(phone, @"^(?:\+7|8|7)\s*(?:\(\d{3}\)|\d{3})\s*\d{3}[-\s]?\d{2}[-\s]?\d{2}$"))
			return Errors.Authentication.InvalidCredentials;

		phone = DropSymbols(phone);

		if (phone.Length != 11)
			return Errors.Authentication.InvalidCredentials;

		if (existingPhones.Contains(phone))
			return Errors.Authentication.InvalidCredentials;

		return new Phone(phone);
	}

	private static string DropSymbols(string phoneNumber)
	{
		string digitsOnly = Regex.Replace(phoneNumber, @"\D", "");
		return digitsOnly;
	}
}