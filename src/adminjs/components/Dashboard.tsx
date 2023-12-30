import React, { useEffect, useState } from "react";
import {
  // imports de estilos
  H1,
  H2,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@adminjs/design-system";
import { ApiClient, useCurrentAdmin } from "adminjs";

export default function Dashboard() {
  // método que captura o admin atual. Usaremos ele pra exibir o nome do usuário na dashboard
  const [currentAdmin] = useCurrentAdmin();

  // o objeto ApiClient() serve para acessar o método getDashboard() do sequelize
  const api = new ApiClient();

  // aqui declaramos que o resources possui várias chaves e que todas elas são do tipo number
  const [resources, setResources] = useState<{ [key: string]: number }>();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    const res = await api.getDashboard(); //getDashboard() captura o JSON que foi declarado lá dentro do index.ts (no campo dashboard)
    setResources(res.data);
  }

  return (
    <section style={{ padding: "1.5rem" }}>
      <H1>Seja bem-vindo(a), {currentAdmin?.firstName}!</H1>

      <section style={{ backgroundColor: "#FFF", padding: "1.5rem" }}>
        <H2>Resumo</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#2da837" }}>
              <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
              <TableCell style={{ color: "#FFF" }}>Registros</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources ? (
              Object.entries(resources).map(([resource, count]) => (
                <TableRow key={resource}>
                  <TableCell>{resource}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </section>
    </section>
  );
}
