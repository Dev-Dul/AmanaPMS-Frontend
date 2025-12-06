import { registerNewPurchase, registerNewBatch, useFetchDrugs, useFetchItems } from "../../utils/fetch";
import styles from "../styles/newpurchasepage.module.css";
import { AuthContext } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { ArrowLeft } from "lucide-react";
import Error from "../components/Error";
import { toast } from "sonner";

function NewPurchasePage() {
  const navigate = useNavigate();
  const [saleType, setSaleType] = useState("");
  const { drugs, setDrugs, drugLoading, drugError } = useFetchDrugs();
  const { items, setItems, itemsLoading, itemsError } = useFetchItems();
  const { user, loading, error, setUser } = useContext(AuthContext);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  function handleNewPurchase(newPurchase){
    if(newPurchase.type === 'DRUG'){
      setDrugs(prevDrugs => 
        prevDrugs.map(drug => 
          drug.id === newPurchase.drug.id 
          ? { ...drug, quantity : drug.quantity - newPurchase.quantity }
          : drug
        )
      )
    }else{
       setItems((prevItems) =>
         prevItems.map((item) =>
           item.id === newPurchase.item.id
             ? { ...item, quantity: item.quantity - newPurchase.quantity }
             : item
         )
       );
    }

    setUser(prev  => ({
      ...prev,
      purchases: [...prev.purchases, newPurchase]
    }))
  }

  async function onSubmit(formData) {
    let obj = null;
    if(formData.type === "DRUG"){
      obj = drugs.find(drug => drug.id === formData.drugId);
    }else{
      obj = items.find(item => item.id === formData.itemId);
    }

    const isValid = obj.quantity >= formData.quantity;
    if(!isValid){
      toast.error("Quantity entered exceeds the product's available quantity in stock!");
      return;
    }

    const salePromise = registerNewPurchase(formData.type, formData.quantity, user.id, formData.drugId, formData.itemId);
    toast.promise(salePromise, {
      loading: "Recording new sale...",
      success: (response) => {
        if (response) {
          reset();
          handleNewPurchase(response.purchase);
          return response.message;
        }
      },
      error: (error) => {
        return error.message;
      },
    });
  }

  if (!user) return <Error error={"User not found!"} />;
  if (loading || drugLoading || itemsLoading) return <Loader />;
  if (itemsError || drugError) return <Error error={ itemsError ?? drugError} />;

  const sortedDrugs = drugs?.sort((a, b) => a.name.localeCompare(b.name));
  const sortedItems = items?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={`${styles.one} container`}>
      <div className="header">
        <ArrowLeft onClick={() => navigate(-1)} className={styles.arrow} />
      </div>

      <div className={styles.top}>
        <h2>Record a New Sale</h2>
      </div>

      <div className={`${styles.body} ${styles.two}`}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="name">TYPE</label>
            <select
              id="type"
              {...register("type", { required: "Sales's type is required" })}
              onChange={(e) => setSaleType(e.target.value)}>
              <option value="" disabled selected>
                Select a sale type
              </option>
              <option value="DRUG">DRUG</option>
              <option value="COSMETIC">COSMETIC</option>
              <option value="OTHER">OTHER</option>
            </select>
            {errors.type && (
              <p className={styles.error}>{errors.type.message}</p>
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
          {saleType === "DRUG" && (
            <div className={styles.inputBox}>
              <label htmlFor="drugId">Select Drug</label>
              <select
                id="drugId"
                {...register("drugId", {
                  required: "Please select a drug",
                })}>
                <option value="" disabled selected>
                  Select a drug
                </option>
                {sortedDrugs?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} - (₦{d.price})- Qtt left: {d.quantity}
                  </option>
                ))}
              </select>
              {errors.drugId && (
                <p className={styles.error}>{errors.drugId.message}</p>
              )}
            </div>
          )}

          {saleType !== "DRUG" && (
            <div className={styles.inputBox}>
              <label htmlFor="itemId">Select Item</label>
              <select
                id="itemId"
                {...register("itemId", {
                  required: "Please select an item",
                })}>
                <option value="" disabled selected>
                  Select an item
                </option>
                {sortedItems?.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.name} - (₦{it.price}) - Qtt left: {it.quantity}
                  </option>
                ))}
              </select>
              {errors.ItemId && (
                <p className={styles.error}>{errors.ItemId.message}</p>
              )}
            </div>
          )}

          <button type="submit">Record</button>
          <p className={styles.note}>Note: Recorded sales will not show up here. All Sales / Purchases can be found at the sales history page!</p>
        </form>
      </div>
    </div>
  );
}

export default NewPurchasePage;
