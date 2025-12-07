import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export async function SignUp(name, email, id, role, password) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        role: role,
        email: email,
        fullname: name,
        password: password,
      }),
    });

    if(!res.ok) throw new Error("Error Signing Up!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  } 
}


export async function hydrateUser(){
  try {
    const response = await fetch(`${apiUrl}/api/v1/auth/hydrate`, {
      method: "GET",
      credentials: "include", // allows sending cookies/session
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok){
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || "Failed to hydrate user";
      throw new Error(message);
    }

    const data = await response.json();
    return data; // expected shape: { user: {...} }
  }catch(err){
    console.error("Hydration error:", err);
    throw err;
  }
}


export async function LogIn(username, password){
  try{
    const res = await fetch(`${apiUrl}/api/v1/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await res.json();
    if(!res.ok) throw new Error(data.message);
    if(data.user.status !== "ACTIVE") throw new Error("Your account has been suspended!");
    return data;
  }catch(err){
    throw err;
  }
}

export async function LogOut(){
  try{
    const res = await fetch(`${apiUrl}/api/v1/logout`, {
      credentials: "include",
    });

    if(!res.ok) throw new Error("Error Logging Out!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}



export function useFetchOverView(){
    const [ovError, setError] = useState(null);
    const [overview, setOv] = useState({});
    const [ovLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOverView(){
            try{
                const res = await fetch(`${apiUrl}/api/v1/admin/overview`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!res.ok) throw new Error("Error fetching Overview!");
                const data = await res.json();
                setOv(data.overview);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchOverView();

    }, []);

    return { overview, ovLoading, ovError };
}


export function useFetchStats(){
    const [stats, setStats] = useState([]);
    const [statError, setError] = useState(null);
    const [statLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats(){
            try{
                const res = await fetch(`${apiUrl}/api/v1/admin/revenue/stats`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!res.ok) throw new Error("Error fetching Stats!");
                const data = await res.json();
                setStats(data.stats);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchStats();

    }, []);

    return { stats, statLoading, statError };
}



export function useLast7DaysPurchases() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch(`${apiUrl}/api/v1/admin/data/recent`, {
          credentials: "include",
        });
        const json = await res.json();
        if(!res.ok) throw new Error(json.message);
        setData(json.purchases);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    fetchPurchases();
  }, []);

  return { data, loading, error };
}


export function usefetchPurchases() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const res = await fetch(`${apiUrl}/api/v1/purchases/all`, {
          credentials: "include",
        });
        const json = await res.json();
        if(!res.ok) throw new Error(json.message);
        setData(json.purchases);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    fetchPurchases();
  }, []);

  return { data, loading, error };
}


export function usefetchBatches() {
  const [error, setError] = useState(null);
  const [batches, setBatches] = useState([]);
  const [batchesLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatches() {
      try {
        const res = await fetch(`${apiUrl}/api/v1/purchases/batches/all`, {
          credentials: "include",
        });
        const json = await res.json();
        if(!res.ok) throw new Error(json.message);
        setBatches(json.batches);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    fetchBatches();
  }, []);

  return { batches, batchesLoading, error };
}



export function useFetchDrugs(){
    const [drugs, setDrugs] = useState([]);
    const [drugError, setError] = useState(null);
    const [drugLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDrugs(){
            try{
                const res = await fetch(`${apiUrl}/api/v1/products/drugs/all`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!res.ok) throw new Error("Error fetching drugs!");
                const data = await res.json();
                setDrugs(data.drugs);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchDrugs();

    }, []);

    return { drugs, setDrugs, drugLoading, drugError };
}

export async function registerNewDrug(name, cost, price, quantity, manufacturer, userId){
  try{
    const res = await fetch(`${apiUrl}/api/v1/products/drugs/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        cost: cost,
        price: price,
        userId: userId,
        quantity: quantity,
        manufacturer: manufacturer,
      })
    });

    if(!res.ok) throw new Error("Error registering new drug!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}


export async function updateDrug(drugId, name, cost, price, quantity, manufacturer){
  try{
    const res = await fetch(`${apiUrl}/api/v1/products/drugs/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        cost: cost,
        price: price,
        drugId: drugId,
        quantity: quantity,
        manufacturer: manufacturer,
      })
    });

    if(!res.ok) throw new Error("Error updating drug!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}


export async function deleteDrug(drugId){
  try{
    const res = await fetch(`${apiUrl}/api/v1/products/drugs/delete/${drugId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if(!res.ok) throw new Error("Error deleting drug!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}


export async function deleteItem(itemId){
  try{
    const res = await fetch(`${apiUrl}/api/v1/products/items/delete/${itemId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if(!res.ok) throw new Error("Error deleting item!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}

export async function updateItem(itemId, name, cost, price, quantity, manufacturer, type){
  try{
    const res = await fetch(`${apiUrl}/api/v1/products/items/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        cost: cost,
        type: type,
        price: price,
        itemId: itemId,
        quantity: quantity,
        manufacturer: manufacturer,
      })
    });

    if(!res.ok) throw new Error("Error updating item!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}


export function useFetchItems(){
    const [items, setItems] = useState([]);
    const [itemsError, setError] = useState(null);
    const [itemsLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchItems(){
            try{
                const res = await fetch(`${apiUrl}/api/v1/products/items/all`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!res.ok) throw new Error("Error fetching Items!");
                const data = await res.json();
                setItems(data.items);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchItems();

    }, []);

    return { items, setItems, itemsLoading, itemsError };
}

export async function registerNewItem(name, cost, price, quantity, manufacturer, type, userId){
  try{
    const res = await fetch(`${apiUrl}/api/v1/products/items/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        cost: cost,
        type: type,
        price: price,
        userId: userId,
        quantity: quantity,
        manufacturer: manufacturer,
      })
    });

    if(!res.ok) throw new Error("Error registering new item!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}


export function useFetchRevenue(){
    const [revError, setError] = useState(null);
    const [revenue, setRevenue] = useState([]);
    const [revLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRevenue(){
            try{
                const res = await fetch(`${apiUrl}/api/v1/revenue/all`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!res.ok) throw new Error("Error fetching revenue!");
                const data = await res.json();
                setRevenue(data.revenue);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchRevenue();

    }, []);

    return { revenue, revLoading, revError };
}

export function useFetchUsers(){
  const [users, setUsers] = useState([]);
  const [usersError, setError] = useState(null);
  const [usersLoading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchUsers() {
        try {
          const res = await fetch(`${apiUrl}/api/v1/admin/users/all`, {
            method: "GET",
            credentials: "include",
          });

          if(!res.ok) throw new Error("Error fetching Users!");
          const data = await res.json();
          setUsers(data.users);

        }catch(err){
          setError(err.message);
        }finally{
          setLoading(false);
        }
      }

      fetchUsers();
    }, []);

    return { users, usersLoading, usersError };
}


export function useFetchStaff(){
  const [staff, setStaff] = useState([]);
  const [staffError, setError] = useState(null);
  const [staffLoading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchStaff() {
        try {
          const res = await fetch(`${apiUrl}/api/v1/admin/users/staff/all`, {
            method: "GET",
            credentials: "include",
          });

          if(!res.ok) throw new Error("Error fetching Staff!");
          const data = await res.json();
          setStaff(data.staff);

        }catch(err){
          setError(err.message);
        }finally{
          setLoading(false);
        }
      }

      fetchStaff();
    }, []);

    return { staff, setStaff, staffLoading, staffError };
}


export async function registerNewStaff(fullname, password, email, username){
  try {
    const res = await fetch(`${apiUrl}/api/v1/admin/staff/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        fullname: fullname,
        password: password,
      }),
    });

    if (!res.ok) throw new Error("Error registering new staff!");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}


export async function updateAdminProfile(fullname, password, email, username, userId){
  try {
    const res = await fetch(`${apiUrl}/api/v1/admin/profile/update`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        userId: userId,
        username: username,
        fullname: fullname,
        password: password,
      }),
    });

    if (!res.ok) throw new Error("Error updating admin profile!");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}


export async function manageStaff(userId){
  try {
    const res = await fetch(`${apiUrl}/api/v1/admin/staff/manage/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!res.ok) throw new Error("Error suspending / activating staff account!");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}


export async function deleteStaff(userId){
  try {
    const res = await fetch(`${apiUrl}/api/v1/admin/staff/delete/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!res.ok) throw new Error("Error deleting staff account!");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}


export async function registerNewPurchase(type, quantity, sellerId, drugId, itemId){
  try {
    const res = await fetch(`${apiUrl}/api/v1/purchases/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type,
        quantity: quantity,
        sellerId: sellerId,
        ...(drugId && { drugId: drugId }),
        ...(itemId && { drugId: itemId }),
      }),
    });

    if (!res.ok) throw new Error("Error recording new purchase!");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}


export async function registerNewBatch(totalDrugs, totalItems, totalCost, userId){
  try {
    const res = await fetch(`${apiUrl}/api/v1/purchases/batches/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       userId,
       totalCost,
       totalDrugs,
       totalItems,
      }),
    });

    if(!res.ok) throw new Error("Error recording new batch!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}


export function useFetchUser(userId){
    const [member, setMember] = useState(null);
    const [memberError, setError] = useState(null);
    const [memberLoading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchUser(userId) {
        try {
          const res = await fetch(`${apiUrl}/api/v1/admin/users/${userId}`, {
            method: "GET",
            credentials: "include",
          });

          if(!res.ok) throw new Error("Error fetching user!");
          const data = await res.json();
          setMember(data.user);
        }catch(err) {
          setError(err.message);
        }finally {
          setLoading(false);
        }
      }

      fetchUser(userId);
    }, []);

    return { member, memberLoading, memberError };
}




export async function createNewTrip(time, busId, routeId){
    try{
      const res = await fetch(`${apiUrl}/api/v1/trips/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            busId: busId,
            routeId: routeId,
            departure: time,
          }),
        }
      );

      const data = await res.json();
      if(!res.ok) throw new Error(data.message);
      return data;
    }catch(err){
      throw err;
    }
}


export function useFetchTrip(tripId){
    const [trip, setTrip] = useState(null);
    const [tripError, setError] = useState(null);
    const [tripLoading, setLoading] = useState(true);

    async function refetch(tripId){
      try {
        const res = await fetch(`${apiUrl}/api/v1/trips/${tripId}`, {
          method: "GET",
          credentials: "include",
        });

        if(!res.ok) throw new Error("Error fetching trip");
        const data = await res.json();
        setTrip(data.trip);
      }catch(err) {
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }

    useEffect(() => {
      async function fetchTrip(tripId){
        try {
          const res = await fetch(`${apiUrl}/api/v1/trips/${tripId}`, {
            method: "GET",
            credentials: "include",
          });

          if(!res.ok) throw new Error("Error fetching trip");
          const data = await res.json();
          setTrip(data.trip);
        }catch(err) {
          setError(err.message);
        }finally{
          setLoading(false);
        }
      }

      fetchTrip(tripId);
    }, []);

    return { trip, tripLoading, tripError, refetch };
}


export function useFetchTrips(){
    const [trips, setTrips] = useState(null);
    const [tripsError, setError] = useState(null);
    const [tripsLoading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchTrips(){
        try{
          const res = await fetch(`${apiUrl}/api/v1/trips/all`, {
            method: "GET",
            credentials: "include",
          });

          if(!res.ok) throw new Error("Error fetching trips");
          const data = await res.json();
          setTrips(data.trips);
        }catch(err) {
          setError(err.message);
        }finally{
          setLoading(false);
        }
      }

      fetchTrips();
    }, []);

    return { trips, tripsLoading, tripsError };
}

export function useFetchTodaysTrips() {
  const [trips, setTrips] = useState([]);
  const [tripsError, setError] = useState(null);
  const [tripsLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodaysTrips(){
      try{
        const res = await fetch(`${apiUrl}/api/v1/trips/today`,{
            method: "GET",
            credentials: "include",
          }
        );

        if(!res.ok) throw new Error("Error fetching trips for Today!");
        const data = await res.json();
        setTrips(data.trips || []);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }

    fetchTodaysTrips();
  }, []);

  return { trips, tripsLoading, tripsError };
}










