**_ Example _**

// Uncomment and adapt this function if needed
// async function addWorldAndInvalidateOthers(data: any) {
// const result = await serverQueryCache.fetchData(
// 'addWorld',
// '/api/addworld',
// {
// method: 'POST',
// headers: { 'Content-Type': 'application/json' },
// data: JSON.stringify(data)
// },
// 5000, // stale time for this request
// [
// { key: 'loadPlayers', staleTime: 30000 },
// { key: 'getBalances', staleTime: 60000 },
// { key: 'fetchMap', staleTime: 60000 }
// ],
// true // force invalidate
// );

// return result;
// }

// Usage example
// const worldData = {
// name: 'New World',
// size: 'Large',
// difficulty: 'Hard'
// };

// addWorldAndInvalidateOthers(worldData)
// .then((result) =>
// console.log('World added and other data invalidated:', result)
// )
// .catch((error) => console.error('Error adding world:', error));
