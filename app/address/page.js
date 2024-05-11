"use client";
import { Country, State, City } from "country-state-city";
import { useUserAuth } from "../context/AuthContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "@/redux/slices/addressSlice";
const AddressPage = () => {
  const addressInfo = useSelector(state => state.address)
  const dispatch = useDispatch()
  const router = useRouter();
  const {user} = useUserAuth()

  const countrys = Country.getAllCountries();
  const state = State.getAllStates();

  const [nameUser,setNameUser] = useState(addressInfo.info?addressInfo.info.name:'')
  const [streetUser,setStreetUser] = useState(addressInfo.info?addressInfo.info.street:'')
  const [cityUser,setCityUser] = useState(addressInfo.info?addressInfo.info.city:'')
  const [stateUser,setStateUser] = useState(addressInfo.info?addressInfo.info.state:'')
  const [zipUser,setZipUser] = useState(addressInfo.info?addressInfo.info.zip:'')
  const [phoneUser,setPhoneUser] = useState(addressInfo.info?addressInfo.info.phone:'')
  

  const firstCountry = countrys.find(country => country.name === 'United States')

  const firstState = state.filter(
    (item) =>  item.countryCode === firstCountry.isoCode
  );

  const [showState, setShowState] = useState(firstState);
  const [selectCountry, setSelectCountry] = useState(addressInfo.info?addressInfo.info.country:firstCountry.name);

  const onChangeCountry = (e) => {
    setSelectCountry(e.target.value);
  };

  const submitAddressHandler = (e) => {
    e.preventDefault();
    const dataAddress = {
      name: nameUser,
      street: streetUser,
      city: cityUser,
      state: stateUser,
      zip: zipUser,
      country: selectCountry,
      phone: phoneUser,
      user: user.email
    };
    dispatch(updateAddress(dataAddress))
    router.push('/')
  };

  const onCancelHandler = () => {
    router.push("/cartshopping");
  };

  useEffect(() => {
    const countryChange = countrys.find(
      (country) => country.name === selectCountry
    );
    const newState = state.filter(
      (state) => state.countryCode === countryChange.isoCode
    );
    setShowState(newState);
  }, [selectCountry]);

  return (
    <main className="h-screen w-screen flex justify-betwwen items-center backgroundMain">
      <div className="backgroundHome flex flex-col m-auto max-w-[700px] w-full px-8 py-6 rounded-md gap-4  shadow p-4">
        <form
          className="bg-white backgroundHome "
          onSubmit={submitAddressHandler}
        >
          <h1 className="text-2xl font-semibold mb-4">Address</h1>
          <div className="flex flex-col">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              className="p-2 outline-gray-400"
              onChange={e => setNameUser(e.target.value)}
              // ref={nameRef}
              value={nameUser}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Street *</label>
            <input
              type="text"
              name="street"
              className="p-2 outline-gray-400"
              onChange={e => setStreetUser(e.target.value)}
              value={streetUser}
              // ref={streetRef}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>City *</label>
            <input
              type="text"
              name="city"
              className="p-2 outline-gray-400"
              onChange={e => setCityUser(e.target.value)}
              value={cityUser}
              // ref={cityRef}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>State *</label>
            <select
              name="state"
              className="py-2 outline-gray-400"
              onChange={e => setStateUser(e.target.value)}
              // ref={stateRef}
              required
            >
              {addressInfo.info ? <option value={stateUser} selected disabled hidden>{stateUser}</option> :<option value="none" selected disabled hidden>Select state</option>}
              {showState.map((state, index) => (
                <option key={index} value={state.name} >
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Zip code *</label>
            <input
              type="text"
              name="zip"
              className="p-2 outline-gray-400"
              onChange={e => setZipUser(e.target.value)}
              value={zipUser}
              // ref={zipRef}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Country *</label>
            <select
              name="Country"
              className="py-2 outline-gray-400"
              onChange={onChangeCountry}
              // ref={countryRef}
              required
            >
              {countrys.map((country, index) => (
                <option key={index} value={country.name}  selected={addressInfo.info ?country.name === selectCountry :country.name === 'United States'}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              className="p-2 outline-gray-400"
              // ref={phoneRef}
              onChange={e => setPhoneUser(e.target.value)}
              value={phoneUser}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 buttonColor text-white rounded-md mt-4 active:scale-95">
              Save
            </button>
            <button type="button"
              className="px-3 py-2 border border-gray-400 rounded-md mt-4 active:scale-95"
              onClick={onCancelHandler}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddressPage;
