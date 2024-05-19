import { useEffect , useState } from "react";

export default function useAuth() {
  const [state, setState] = useState({ success: null });

  useEffect(() => {
    fetch(import.meta.env.VITE_API+"/auth", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": import.meta.env.VITE_API,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      })
      .catch((err) => setState({ success: false }));
  }, []);
  return [state, setState];
}