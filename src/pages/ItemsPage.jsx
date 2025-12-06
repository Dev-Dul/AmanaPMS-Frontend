import { useFetchItems, registerNewItem, updateItem, deleteItem } from "../../utils/fetch";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import styles from "../styles/routespage.module.css";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Item from "../components/Item";
import { toast } from "sonner";

function ItemsPage() {
    const [open, setOpen] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [statFilter, setStatFilter] = useState(null);
    const { user, userLoad } = useContext(AuthContext);
    const { items, setItems, itemsLoading, itemsError } = useFetchItems();
    const { register, handleSubmit, reset, formState: { errors }} = useForm({ defaultValues: {
      name: '', quantity: 0, price: 0.0, cost: 0.0, manufacturer: "", type: ''
    }});
    

    function handleOverlay(){
        setOverlay(prev => !prev);
    }

    function handleOpen(){
        setOpen(false);
    }

    function handleUpdate(item){
        reset(item);
        setUpdate(prev => !prev);
        setOverlay(prev => !prev);
    }

    function handleExport(){
      if(items.length > 0){
        exportToExcel(items, "swiftryde_routes_data", "SWIFTRYDE ROUTES DATA");
      }else{
        toast.error("No data available");
      }
    }

    function handleStatChange(e) {
       const v = e.target.value;
       setStatFilter(v === "true" ? true : v === "false" ? false : null);
    }

    function handleFilter() {
      let filtered = items;
      // Filter by status
      if(statFilter !== null) filtered = filtered.filter((item) => item.isAvailable === statFilter);

      setFilteredData(filtered);
    }

    function updateItemList(item, mode = "new"){
      switch (mode) {
        case "new":
          setItems(prev => [item, ...prev]);
          break;
        case "delete":
          setItems((prevItems) =>
            prevItems.filter((pvd) => pvd.id !== item.id)
          );
          break;
        default:
          break;
      }
    }

    async function onSubmit(formData){
      let itemPromise = null;
      if(isUpdate){
        itemPromise = updateItem(formData.itemId, formData.name, formData.cost, formData.price, formData.quantity, formData.manufacturer, formData.type);
      }else{
        itemPromise = registerNewItem(formData.name, formData.cost, formData.price, formData.quantity, formData.manufacturer, formData.type, user.id);
      }

      toast.promise(itemPromise, {
          loading: `${isUpdate ? "Updating" : "Registering new"} Item...`,
          success: (response) => {
            updateItemList(response.item);
            return response.message;
          },
          error: (error) => {
              return error.message;
          }
      })
  }

  async function handleAction(id) {
      const itemPromise = deleteItem(id);
      toast.promise(itemPromise, {
        loading: "Deleting item...",
        success: (response) => {
          if(response.item){
            updateItemList(response.item, "delete");
          }
          return response.message;
        },
        error: (error) => {
          return error.message;
        },
      });
    }
    
    function handleDelete(id){
      setOpen(id);
    }

    useEffect(() => {
      handleFilter();
    }, [statFilter, items]);

    if(itemsLoading || userLoad) return <Loader />;
    if(!user) return <Error />;
    if(itemsError) return <Error error={itemsError} />;

    const isAvailable = items?.filter(item => item.isAvailable === true).length;
    const isFinished = items?.filter(item => item.isAvailable !== true).length;
    

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>{isUpdate ? "Update Item" : "Register A New Item"}</h2>
          <input type="hidden" {...register("itemId")}/>
          <div className={styles.inputBox}>
            <label htmlFor="name">Item name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Item's name is required",
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
                required: "Item's cost is required",
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
                required: "Item's price is required",
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
                required: "Item's quantity is required",
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
            <label htmlFor="type">Type</label>
            <select
              id="type"
              {...register("type", {
                required: "Items's type is required",
              })}>
              <option value="" selected disabled>
                Select a type
              </option>
              <option value="COSMETIC">COSMETIC</option>
              <option value="OTHER">OTHER</option>
            </select>
            {errors.type && (
              <p className={styles.error}>{errors.type.message}</p>
            )}
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              {...register("manufacturer", {
                required: "item's manufacturer is required",
              })}
            />
            {errors.manufacturer && (
              <p className={styles.error}>{errors.manufacturer.message}</p>
            )}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>

      <div className={`${styles.overlay} ${open ? styles.active : ''}`}>
          <XCircle className={styles.close} onClick={handleOpen} />
          <div className={styles.selectionBox}>
              <h2>Are you sure you want to delete this item?</h2>
              <div className={styles.btnBox}>
                  <button className={styles.danger} onClick={() => handleAction(open)}>Yes</button>
                  <button onClick={() => setOpen(false)}>No</button>
              </div>
          </div>
      </div>

      <div className="header">
        <h2>items</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Items</h2>
            <h3>{items?.length}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Available Items</h2>
            <h3>{isAvailable}</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Finished Items</h2>
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
                onChange={handleStatChange}>
                <option value="null">ALL</option>
                <option value="true">AVAILABLE</option>
                <option value="false">FINISHED</option>
              </select>
            </div>
          </div>
          <div className={styles.left}>
            <button onClick={handleExport}>
              Download Item Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOverlay}>
              Register New Item <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.middle}>
        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>COST</th>
              <th>PRICE</th>
              <th>QTT</th>
              <th>TYPE</th>
              <th>STATUS</th>
              <th>DATE REGISTERED</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData.map((item) => (
                <Item item={item} key={item.id} handleUpdate={handleUpdate} handleDelete={handleDelete} />
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemsPage;
