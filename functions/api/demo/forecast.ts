export const onRequest: PagesFunction = async () => {
  const data = [
    { month: 'Sep', cashIn: 28000, cashOut: 21000, netCash: 7000, eomBalance: 42000 },
    { month: 'Oct', cashIn: 29500, cashOut: 21900, netCash: 7600, eomBalance: 49600 },
    { month: 'Nov', cashIn: 31000, cashOut: 22600, netCash: 8400, eomBalance: 58000 },
    { month: 'Dec', cashIn: 32300, cashOut: 23800, netCash: 8500, eomBalance: 66500 },
    { month: 'Jan', cashIn: 33000, cashOut: 24500, netCash: 8500, eomBalance: 75000 },
    { month: 'Feb', cashIn: 34000, cashOut: 25100, netCash: 8900, eomBalance: 83900 }
  ]
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  })
}
