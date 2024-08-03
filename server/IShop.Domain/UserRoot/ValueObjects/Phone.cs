using IShop.Domain.Common.Exceptions;
using System.Text.RegularExpressions;

namespace IShop.Domain.UserRoot.ValueObjects;

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
            throw new ValidationException(
                "validation-exception",
                $"Некорректный номер телефона {trimmedInput}!",
                "Некорректный номер телефона!");
    }

    public static string Trim(string phoneNumber) =>
        Regex.Replace(phoneNumber, @"\D", "").Trim();


    public static bool Validate(string phoneNumber)
    {
        if (Regex.IsMatch(phoneNumber, "^7\\d{10}$"))
            return true;
        else
            return false;
    }
}