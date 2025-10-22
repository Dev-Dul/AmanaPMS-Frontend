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


export async function hydrateUser() {
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


export async function LogIn(id, password){
  try{
    const res = await fetch(`${apiUrl}/api/v1/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: id,
        password: password,
      }),
    });

    if(!res.ok) throw new Error("Error Logging In!");
    const data = await res.json();
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



export function useTripsLast7Days() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch(`${apiUrl}/api/v1/admin/data/recent`, {
          credentials: "include",
        });
        const json = await res.json();
        if(!res.ok) throw new Error(json.message);
        setData(json.data);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  return { data, loading, error };
}


export function useFetchStats(type){
  const [stats, setStat] = useState([]);
  const [statLoading, setLoading] = useState(true);
  const [statError, setError] = useState(null);

  useEffect(() => {
    async function fetchStats(type){
      try {
        const res = await fetch(`${apiUrl}/api/v1/admin/data/weekly/${type}`, {
          credentials: "include",
        });
        const json = await res.json();
        if(!res.ok) throw new Error(json.message);
        setStat(json.data);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    fetchStats(type);
  }, []);

  return { stats, statLoading, statError };
}


export function useFetchBuses(){
    const [busError, setError] = useState(null);
    const [buses, setBuses] = useState([]);
    const [busLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBuses(){
            try{
                const res = await fetch(`${apiUrl}/api/v1/admin/buses/all`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!res.ok) throw new Error("Error fetching buses!");
                const data = await res.json();
                setBuses(data.buses);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchBuses();

    }, []);

    return { buses, busLoading, busError };
}

export async function registerNewBus(plateNum, make, model, capacity, driverId, conductorId){
  try{
    const res = await fetch(`${apiUrl}/api/v1/admin/buses/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        make: make,
        model: model,
        driverId: driverId,
        capacity: capacity,
        plateNum: plateNum,
        conductorId: conductorId
      })
    });

    if(!res.ok) throw new Error("Error registering new bus!");
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}


export function useFetchRoutes(){
    const [routeError, setError] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [routeLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRoutes(){
            try{
                const res = await fetch(`${apiUrl}/api/v1/admin/routes/all`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!res.ok) throw new Error("Error fetching routes!");
                const data = await res.json();
                setRoutes(data.routes);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchRoutes();

    }, []);

    return { routes, routeLoading, routeError };
}

export async function createNewRoute(name, shortName, startPoint, endPoint) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/admin/routes/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        endPoint: endPoint,
        shortName: shortName,
        startPoint: startPoint
      }),
    });

    if(!res.ok) throw new Error("Error creating new route!");
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


export function useFetchOperators(){
  const [operators, setOperators] = useState([]);
  const [operatorError, setError] = useState(null);
  const [operatorsLoading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchOperators() {
        try {
          const res = await fetch(`${apiUrl}/api/v1/admin/users/operators/all`, {
            method: "GET",
            credentials: "include",
          });

          if(!res.ok) throw new Error("Error fetching Operators!");
          const data = await res.json();
          setOperators(data.operators);

        }catch(err){
          setError(err.message);
        }finally{
          setLoading(false);
        }
      }

      fetchOperators();
    }, []);

    return { operators, operatorsLoading, operatorError };
}

export async function registerNewOperator(fullname, role, staffId, busId){
  try {
    const res = await fetch(`${apiUrl}/api/v1/admin/operators/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        busId: busId,
        staffId: staffId,
        fullname: fullname,
      }),
    });

    if (!res.ok) throw new Error("Error registering new operator!");
    const data = await res.json();
    return data;
  } catch (err) {
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
          const res = await fetch(`${apiUrl}/api/v1/users/${userId}`, {
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



export async function verifyTicket(ticketData){
    try{
        const res = await fetch(`${apiUrl}/api/v1/tickets/verify`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: ticketData,
          }),
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message);
        return data;
    }catch(err){
        throw err;
    }
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


export async function markTripAsDone(tripId){
    try{
      const res = await fetch(`${apiUrl}/api/v1/trips/done/${tripId}`, {
          credentials: "include",
        }
      );

      const data = await res.json();
      if(!res.ok) throw new Error(data.message);
      return data;
    }catch(err){
      throw err;
    }
}


export async function purchaseTicket(price, userId, tripId){
    try{
      const res = await fetch(`${apiUrl}/api/v1/tickets/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            price: price,
            tripId: tripId,
            userId: userId,
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










