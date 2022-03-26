import React from "react";
import {Layout} from "../../components/reboot/Layout";
import {useDispatch} from "../../lib/hooks/useState";
import {actions} from "../../lib/store/main/actions";

const Check = () => {
    const dp = useDispatch();
    return (
        <Layout>
            <div onClick={() => dp(actions.addToFavorites('ab oba'))}>
                s
            </div>
        </Layout>
    );
};

export default Check
