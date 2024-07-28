using IShop.Domain.Common.Models;
using IShop.Domain.UserRoot;

namespace IShop.Domain.MediaEntity;

public class Media : AggregateRoot<Guid>
{
    private Media() : base(new Guid()) { }
    private Media(Guid fileName) : base(fileName) { }
    private Media(Guid fileName, string uri, string extension, int fileSize) : this(fileName)
    {
        Uri = uri;
        Extension = extension;
        FileSize = fileSize;
    }

    public static Media Create(Guid fileName, string uri, string extension, int fileSize)
    {
        return new Media(fileName, uri, extension, fileSize);
    }
    public int FileSize { get; private set; }
    public string Extension { get; private set; } = null!;
    public string Uri { get; private set; } = null!;

    public User? User { get; }
}
