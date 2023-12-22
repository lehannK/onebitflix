export function getPaginationParams(
  query: any
): [page: number, perPage: number] {
  // ----------------------------------------------------------------------
  // aqui faremos a configuração de paginação das categorias
  // o query refere-se aos parâmetros passados na URL de uma requisição http
  const { page, perPage } = query;

  // configurando os parametros da query: caso seja string, tranformar em number do mesmo valor
  // caso seja um valor inválido, usar o valor 10 (number) como default
  const perPageNumber =
    typeof perPage === "string" && parseInt(perPage, 10) > 0
      ? parseInt(perPage, 10)
      : 10;

  // retornamos 1 porque se o valor da página não for fornecido, então queremos que seja retornado a página 1
  const pageNumber =
    typeof page === "string" && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;

  return [pageNumber, perPageNumber];
}
