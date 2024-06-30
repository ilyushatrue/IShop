using Flags.Domain.Common.Exceptions;
using System.Text.RegularExpressions;

namespace Flags.Domain.UserRoot.ValueObjects;

public class Phone
{
    private Phone(string value)
    {
        Value = value;
    }

    public string Value { get; private set; } = null!;

    public static Phone Create(string input)
    {
        var trimmedInput = Trim(input);
        if (Validate(trimmedInput))
            return new Phone(trimmedInput);
        else
            throw new ValidationException("Неверный номер телефона");
    }

    public static string Trim(string phoneNumber) => 
        Regex.Replace(phoneNumber, @"\D", "").Trim();


    public static bool Validate(string phoneNumber)
    {
        phoneNumber = Regex.Replace(phoneNumber, @"\D", "").Trim();
        if (Regex.IsMatch(phoneNumber, "^7\\d{10}$"))
            return true;
        else
            return false;
    }
}