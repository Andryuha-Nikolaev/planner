'use client'

import { ListView } from './list-view/ListView'

export type TypeView = 'list' | 'kanban'

export function TasksView() {
	return (
		<div>
			<ListView />
		</div>
	)
}
