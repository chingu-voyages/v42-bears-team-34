import React, { useEffect, useContext } from 'react';
import { APP_ACTIONS } from '../../context/app.actions';
import AppContext from '../../context/AppContext';
import useGetUserProfile from '../../hooks/UseGetUserProfile';
import { TokenManager } from '../../services/token-manager/token-manager';

const Error404 = () => {
	return <h1>404 Not found</h1>;
};
/**
 *
 * @param {{ admin: boolean, requiresAuth: boolean, redirectionComponent: JSX.Element, children: React.Element[]}} props
 */
export function RouteProtector(props) {
	const { dispatch } = useContext(AppContext);
	const token = TokenManager.getToken();
	const [userProfile] = useGetUserProfile(token);

	useEffect(() => {
		dispatch({
			type: APP_ACTIONS.SET_STATE,
			state: {
				user: userProfile,
			},
		});
	}, [userProfile]);

	if (userProfile) {
		if (props.requiresAuth) {
			if (userProfile.expired) {
				return props.redirectionComponent || <Error404 />;
			}
		}

		if (props.admin === true) {
			if (userProfile.role !== 'admin')
				return props.redirectionComponent || <Error404 />;
		}
	}
	if (!userProfile) return props.redirectionComponent || <Error404 />;

	return { ...props.children };
}
