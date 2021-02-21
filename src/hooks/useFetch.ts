import { useEffect, useState } from "react";
import { db } from "../lib/firebase";

interface IUseFetchArgs<T> {
  dbPath: string;
  initialState?: T[];
  orderBy?: string;
}

interface ReturnValues<T> {
  data: T[];
  loading: boolean;
}

export const useFetch = <T>({
  dbPath,
  initialState = [],
  orderBy,
}: IUseFetchArgs<T>): ReturnValues<T> => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<T[]>(initialState);

  useEffect(() => {
    let query = db.collection(dbPath);

    if (orderBy) {
      query = query.orderBy(orderBy) as typeof query;
    }

    return query.onSnapshot((snap) => {
      if (snap.docs.length === 0) {
        setState([]);
        setLoading(false);
        return;
      }
      const data = (snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as unknown) as T[];
      setState(data);
      setLoading(false);
    });
  }, [dbPath, orderBy]);

  return { data: state, loading };
};
