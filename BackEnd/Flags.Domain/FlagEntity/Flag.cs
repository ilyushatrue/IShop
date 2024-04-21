using Flags.Domain.Common.Models;

namespace Flags.Domain.FlagEntity;

public sealed class Flag : AggregateRoot<Guid>
{
    private Flag(string name) : base(Guid.NewGuid())
    {
        Name = name;
    }

    public static Flag Create(string name)
    {
        return new Flag(name);
    }
    public string? Name { get; set; }
}