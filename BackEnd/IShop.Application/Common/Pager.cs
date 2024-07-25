namespace IShop.Application.Common;
public struct Pager<T>
{
    public Pager(IEnumerable<T> pageItems, int totalCount, int currentPage, int pageSize)
    {
        if (currentPage < 1) currentPage = 1;
        if (pageSize <= 0) pageSize = 10;
        PageItems = pageItems;
        TotalPages = (int)Math.Ceiling((decimal)totalCount / pageSize);
        CurrentPage = currentPage > TotalPages ? TotalPages : currentPage;
        PageSize = pageSize;
    }
    public int TotalPages { get; set; }
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public IEnumerable<T> PageItems { get; set; }
}

