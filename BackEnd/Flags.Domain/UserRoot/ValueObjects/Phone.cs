using System.Text.RegularExpressions;
using ErrorOr;
using Flags.Domain.Common.Errors;

namespace Flags.Domain.UserEntity.ValueObjects;

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

        var phone = DropSymbols(input);

        if (phone.Length != 11)
            return Errors.Authentication.InvalidCredentials;

        if (existingPhones.Contains(phone))
            return Errors.Authentication.InvalidCredentials;

        return new Phone(phone);
    }

    public static string DropSymbols(string phoneNumber)
    {
        string digitsOnly = Regex.Replace(phoneNumber, @"\D", "").Trim();
        return digitsOnly;
    }
}