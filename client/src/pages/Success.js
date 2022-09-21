import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import { RECHARGE } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import {useMutation} from "@apollo/client";

function Success() {
    const [recharge] = useMutation(RECHARGE);

    useEffect(() => {
        async function rechargePoints() {
            const points = await idbPromise('points', 'get');
            console.log('=====>',points);
            console.log("--->",points[0].price);
            if (points){
                const { data } = await recharge({ variables: { point: points[0].price } });
                idbPromise('points', 'delete', points);
            }

            setTimeout(() => {
                window.location.assign('/');
            }, 3000);
        }

        rechargePoints();
    }, [recharge]);

    return (
        <div>
            <Jumbotron>
                <h1>Success!</h1>
                <h2>Thank you for shopping in Credible!</h2>
                <h2>You will now be redirected to the home page</h2>
            </Jumbotron>
        </div>
    );
}

export default Success;
