import styles from "../styles/routespage.module.css";
import Drug from "../components/Drug";
import { useFetchDrugs, registerNewDrug, updateItem, updateDrug } from "../../utils/fetch";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { toast } from "sonner";

function DrugsPage() {
    const [isUpdate, setUpdate] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [statFilter, setStatFilter] = useState(null);
    const { user, userLoad } = useContext(AuthContext);
    const { drugs, drugLoading, drugError } = useFetchDrugs();
    const { register, handleSubmit, reset, formState: { errors }} = useForm({ defaultValues: {
      name: '', quantity: 0, price: 0.0, cost: 0.0, manufacturer: ""
    }});
    

    function handleOverlay(){
        setOverlay(prev => !prev);
    }

    function handleUpdate(drug){
        reset(drug);
        setUpdate(prev => !prev);
        setOverlay(prev => !prev);
    }

    function handleExport(){
      if(drugs.length > 0){
        exportToExcel(drugs, "swiftryde_routes_data", "SWIFTRYDE ROUTES DATA");
      }else{
        toast.error("No data available");
      }
    }

    function handleStatChange(e) {
      setStatFilter(e.target.value);
    }

    function handleFilter() {
      let filtered = drugs;
      // Filter by status
      if(statFilter !== null) filtered = filtered.filter((drug) => drug.isAvailable === statFilter);

      setFilteredData(filtered);
    }

    async function onSubmit(formData){
      let drugPromise = null;
      if(isUpdate){
        drugPromise = updateDrug(formData.drugId, formData.name, formData.cost, formData.price, formData.quantity, formData.manufacturer, user.id);
      }else{
        drugPromise = registerNewDrug(formData.name, formData.cost, formData.price, formData.quantity, formData.manufacturer, user.id);
      }

      toast.promise(drugPromise, {
          loading: `${isUpdate ? "Updating" : "Registering new"} drug...`,
          success: (response) => {
            return response.message;
          },
          error: (error) => {
              return error.message;
          }
      })
  }

    useEffect(() => {
      handleFilter();
    }, [statFilter, drugs]);

    if(drugLoading || userLoad) return <Loader />;
    if(!user) return <Error />;
    if(drugError) return <Error error={drugError} />;

    const isAvailable = drugs.filter(drug => drug.isAvailable === true).length;
    const isFinished = drugs.filter(drug => drug.isAvailable !== true).length;
    

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>{isUpdate ? "Update Drug" : "Register A New Drug"}</h2>
          <input type="hidden" {...register("drugId")} />
          <div className={styles.inputBox}>
            <label htmlFor="name">Drug name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Drug's name is required",
              })}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="cost">Cost</label>
            <input
              type="text"
              id="cost"
              {...register("cost", {
                required: "Drug's cost is required",
              })}
            />
            {errors.cost && (
              <p className={styles.error}>{errors.cost.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              {...register("price", {
                required: "Drug's price is required",
              })}
            />
            {errors.price && (
              <p className={styles.error}>{errors.price.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              {...register("quantity", {
                required: "Drugs's quantity is required",
                min: {
                  value: 1,
                  message: "Value must be greater than 0",
                },
              })}
            />
            {errors.quantity && (
              <p className={styles.error}>{errors.quantity.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              {...register("manufacturer", {
                required: "Drug's manufacturer is required",
              })}
            />
            {errors.manufacturer && (
              <p className={styles.error}>{errors.manufacturer.message}</p>
            )}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>

      <div className="header">
        <h2>Drugs</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Drugs</h2>
            <h3>{drugs.length}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Available Drugs</h2>
            <h3>{isAvailable}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Finished Drugs</h2>
            <h3>{isFinished}</h3>
          </div>
        </div>

        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="second">
              <h2>Filter By Status:</h2>
              <select
                name="filter_two"
                id="filter_two"
                onChange={handleStatChange}
              >
                <option value={null}>ALL</option>
                <option value={true}>AVAILABLE</option>
                <option value={false}>FINISHED</option>
              </select>
            </div>
          </div>
          <div className={styles.left}>
            <button onClick={handleExport}>
              Download Drug Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOverlay}>
              Register New Drug <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.middle}>
        <h3>Drugs</h3>
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>COST</th>
              <th>PRICE</th>
              <th>QTT</th>
              <th>STATUS</th>
              <th>DATE REGISTERED</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((drug) => (
                <Drug drug={drug} key={drug.id} handleUpdate={handleUpdate} />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No drugs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DrugsPage;
