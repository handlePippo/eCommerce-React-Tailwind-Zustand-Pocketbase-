import React from "react";
import { NavLink } from "react-router-dom";
import { Button, CartPanel } from "@/Components/";
import { selectCartTotalItem, useCart, useCartPanel } from "@/Services/";
import logo from "../../../assets/logo.png";
import useIsActive from "../../../Hooks/useIsActive";

export default function Navbar() {
  const { isActiveLabel } = useIsActive();
  const toggle = useCartPanel((s) => s.toggle);
  const open = useCartPanel((s) => s.open);
  const totalCartItems = useCart(selectCartTotalItem);

  console.log(totalCartItems);

  return (
    <div className='fixed top-0 left-0 right-0 shadow-2xl z-10'>
      <div className='bg-slate-900 flex justify-between items-center p-3 h-20 text-white'>
        <div className='flex items-center gap-3'>
          <img src={logo} alt='logo' className='w-16' />
          <NavLink to='shop' className={isActiveLabel}>
            SHOP
          </NavLink>
        </div>
        {open && <CartPanel />}
        <div>
          <Button
            className='btn accent lg'
            name={`Cart: ${totalCartItems}`}
            onClick={toggle}
          />
        </div>
      </div>
    </div>
  );
}
