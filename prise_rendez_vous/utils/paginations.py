from rest_framework.pagination import PageNumberPagination

DEFAULT_PAGE = 1

class DefaultPagination(PageNumberPagination):
    page = DEFAULT_PAGE
    
    def __init__(self, request, data_key, serialier, page_size=4) -> None:
        self.data_key = data_key
        self.page_size = page_size
        self.request = request
        self.serializer = serialier

    def get_reponse(self, data):
        resultat = self._paginate(data)
        return {
            'total': self.page.paginator.count,
            'page': int(self.request.GET.get('page', DEFAULT_PAGE)),
            self.data_key: self.serializer(resultat, many=True).data,
            'nombre_pages': self.page.paginator.num_pages
        }

    def _paginate(self, data):
        return self.paginate_queryset(data, self.request)