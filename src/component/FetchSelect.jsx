// import React from 'react';
// import { useSelector } from 'react-redux';
// // import {response} from '../CartSlice/Slice'
// const FetchSelect = () => {
//   const response = useSelector((state) => state.cart.todos); // Assuming 'todos' contains articles

// //   if (!response || !Array.isArray(response)) {
// //     return <p>No articles available</p>; // Fallback if response is not valid
// //   }

//   return (
//     <>
//       {response.map((article, index) => {
//         if (!article) return null; // Skip null or undefined articles

//         return (
//           <div key={index}>
//             <h2>{article.source.name}</h2>
//             <h2>{article.title }</h2>
//             <p>{article.description}</p>
//             <a
//               href={article?.url || "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 underline"
//             >
//               Read more
//             </a>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default FetchSelect;
