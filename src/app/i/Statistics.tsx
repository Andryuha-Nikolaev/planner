import React from 'react'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

const Statistics = () => {
	const { data, isLoading } = useProfile()

	return isLoading ? <Loader /> : <div></div>
}

export default Statistics
