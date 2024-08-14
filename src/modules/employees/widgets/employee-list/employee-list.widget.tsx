import React, { useState } from 'react'
import styles from './employee-list.module.css'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEmployees } from '@/employees/api/employee'
import {
    TableRoot,
    TableHeader,
    TableHead,
    TableBody,
} from '@/common/components/ui/table'
import { EmployeeRow } from '@/employees/components/employee-row'

export type EmployeeListWidgetProps = {}

export function EmployeeListWidget(props: EmployeeListWidgetProps) {
    //Hook to redirect
    const router = useRouter()

    //Role control
    const { data: session } = useSession()
    const isAdmin = session?.user?.roleId === 1

    const [searchParam, setSearchParam] = useState('')
    const [queryParam, setQueryParam] = useState('')
    const [roleIdParam, setRoleIdParam] = useState<number | ''>('')

    const { data, isError, isLoading } = useEmployees({
        size: 10,
        name: queryParam,
        lastname1: queryParam,
    })

    if (isLoading)
        return (
            <div id="loading_div">
                <div id="loader">
                    <svg
                        className="animate-spin h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                    ></svg>
                </div>
            </div>
        )
    if (isError)
        return (
            <div id="error_div">
                <div id="error">
                    <h3 className={styles.question}>Error</h3>
                </div>
            </div>
        )

    const roles = Array.from(new Set(data.map((employee) => employee.roleID)))

    const filterNameLastnameRole = data.filter((employee) => {
        const searchWords = searchParam.toLowerCase().split(' ')

        const matchSearchNameLastname = searchWords.every(
            (word) =>
                employee.employeeName.toLowerCase().includes(word) ||
                employee.employeeLastName1.toLowerCase().includes(word)
        )

        const matchRole = roleIdParam === '' || roleIdParam === employee.roleID

        return matchSearchNameLastname && matchRole
    })

    return (
        <div data-testid="employee-list-widget" className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>EMPLOYEES</h1>
            </div>
            {isAdmin && (
                <>
                    <div className={styles.buttons}>
                        <button
                            onClick={() => router.push(`/auth/register`)}
                            type="submit"
                            className={styles.create_button}
                        >
                            Create new employee
                        </button>
                        <form className={styles.search_form}>
                            <input
                                type="text"
                                placeholder="Search by name or lastname"
                                value={searchParam}
                                onChange={(e) => setSearchParam(e.target.value)}
                                className={styles.search_bar}
                            />
                            <select
                                placeholder="Filter by role"
                                value={roleIdParam}
                                onChange={(e) =>
                                    setRoleIdParam(
                                        e.target.value === ''
                                            ? ''
                                            : parseInt(e.target.value)
                                    )
                                }
                                className={styles.selector}
                            >
                                <option value="">All roles</option>
                                {roles.map((roleId) => (
                                    <option key={roleId} value={roleId}>
                                        {roleId}
                                    </option>
                                ))}
                            </select>
                        </form>
                    </div>
                </>
            )}
            {!isAdmin && (
                <>
                    <div className={styles.buttons_no_admin}>
                        <form className={styles.search_form_no_admin}>
                            <input
                                type="text"
                                placeholder="Search by name or lastname"
                                value={searchParam}
                                onChange={(e) => setSearchParam(e.target.value)}
                                className={styles.search_bar_no_admin}
                            />
                            <select
                                placeholder="Filter by role"
                                value={roleIdParam}
                                onChange={(e) =>
                                    setRoleIdParam(
                                        e.target.value === ''
                                            ? ''
                                            : parseInt(e.target.value)
                                    )
                                }
                                className={styles.selector_no_admin}
                            >
                                <option value="">All roles</option>
                                {roles.map((roleId) => (
                                    <option key={roleId} value={roleId}>
                                        {roleId}
                                    </option>
                                ))}
                            </select>
                        </form>
                    </div>
                </>
            )}
            <div className={styles.table_container}>
                <TableRoot className={styles.table}>
                    <TableHeader className={styles.table_header}>
                        <tr className={styles.table_header}>
                            <TableHead></TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>DNI</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>First lastname</TableHead>
                            <TableHead>Second lastname</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role ID</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {filterNameLastnameRole.map((employee) => (
                            <EmployeeRow
                                key={employee.employeeID}
                                {...employee}
                                onClick={() =>
                                    router.push(
                                        `/employees/${employee.employeeID}`
                                    )
                                }
                            />
                        ))}
                    </TableBody>
                </TableRoot>
            </div>
        </div>
    )
}
