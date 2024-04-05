using Flags.Domain.Common.Models;

namespace Flags.Domain.Flag;

public sealed class Flag : AggregateRoot
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