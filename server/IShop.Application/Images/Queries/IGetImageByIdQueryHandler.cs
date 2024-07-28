namespace IShop.Application.Images.Queries;
public interface IGetImageByIdQueryHandler
{
    Task<(string, byte[])> Handle(GetImageByIdQuery request, CancellationToken cancellationToken);
}
