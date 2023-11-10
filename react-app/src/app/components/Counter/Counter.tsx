'use client'

/* Core */
import { useState } from 'react'

/* Instruments */
import {
    counterSlice,
    useSelector,
    useDispatch,
    selectCount,
    incrementAsync,
    incrementIfOddAsync,
} from '@/lib/redux'
import { HeaderNavBar } from "@/app/components/Navigation/HeaderNavBar"
import styles from './counter.module.css'
import useAuth from "@/lib/hooks/useAuth";

export const Counter = () => {
    const dispatch = useDispatch()
    const count = useSelector(selectCount)
    const [incrementAmount, setIncrementAmount] = useState(2)
    const { isAuthenticated } = useAuth();

    return (
        <div>
            <HeaderNavBar />
            <div className={styles.row}>
                {isAuthenticated && (<p>Welcome user!</p>)}
                {!isAuthenticated && (<p>Welcome guest.</p>)}
            </div>

            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(counterSlice.actions.decrement())}
                >
                    -
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(counterSlice.actions.increment())}
                >
                    +
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(Number(e.target.value ?? 0))}
                />
                <button
                    className={styles.button}
                    onClick={() =>
                        dispatch(counterSlice.actions.incrementByAmount(incrementAmount))
                    }
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={() => dispatch(incrementAsync(incrementAmount))}
                >
                    Add Async
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementIfOddAsync(incrementAmount))}
                >
                    Add If Odd
                </button>
            </div>
        </div>
    )
}