import React from 'react'
import { useGetUser } from '../../hooks/Auth/useGetUser'
import styles from './ProfileWallet.module.css'
import { BsCoin } from 'react-icons/bs'

const ProfileWallet = () => {
  const { user } = useGetUser()

  return (
    <div className={`${styles.profile_wallet_container}`}>
      <div className={`${styles.header}`}>
        <p>My Wallet</p>
      </div>

      <div className={`${styles.wallet_contant}`}>
        <span>
          <BsCoin />
        </span>
        <p>
          Your Coins : <span>{user.wallet}</span>
        </p>
      </div>
    </div>
  )
}
export default ProfileWallet
