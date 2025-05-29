// import { useEffect } from "react";
// import { onSnapshot, Query } from "firebase/firestore";
// import { transactionInterface } from "../types/global";
// import useUIStore from "../store/ui-store";

// interface UseTransactionProps {
//   queryRef: Query;
// }

// const useTransactions = ({ queryRef }: UseTransactionProps) => {
//   const { setTransactions } = useUIStore();

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       queryRef,
//       (snapshot) => {
//         const data = snapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         })) as transactionInterface[];
//         setTransactions(data);
//       },
//       (error) => {
//         console.error("Firestore error:", error);
//       }
//     );

//     return () => unsubscribe();
//   }, [queryRef, setTransactions]);
// };

// export default useTransactions;

// hooks/useTransactions.ts
import { useEffect, useRef } from 'react';
import { Query, onSnapshot } from 'firebase/firestore';
import useUIStore from '../store/ui-store';
import { transactionInterface } from '../types/global';

const useTransactions = (queryRef: Query) => {
  const { setTransactions } = useUIStore();
  const unsubscribeRef = useRef<() => void>(null);

  useEffect(() => {
    unsubscribeRef.current?.();
    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const transactions = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as transactionInterface[];
        setTransactions(transactions);
      },
      (error) => {
        console.error('Firestore error:', error)}
    );

    unsubscribeRef.current = unsubscribe;

    return () => unsubscribe();
  }, [queryRef]);
};

export default useTransactions;