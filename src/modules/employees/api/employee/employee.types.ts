import type { Pagination } from '@/hookey'

export type Employee = {
    employeeID: EmployeeId
    employeeDNI: number
    employeeName: string
    employeeLastName1: string
    employeeLastName2?: string
    employeePhone: string
    employeeEmail: string
    employeePassword: string
    roleID?: RoleId
}

export type EmployeeId = number

export type RoleId = number

export type EmployeeApiResult = Employee

export type EmployeePaginatedApiResult = Employee[]

export type EmployeeListApiParams = Pagination.UsePaginatedQueryParams<{
    name?: string
    lastname1?: string
    roleId?: RoleId
}>

export type EmployeeGetApiParams = {
    resourceId: EmployeeId
}

export type EmployeeCreateApiParams = {
    newResource: Omit<Employee, 'employeeId'>
}

export type EmployeeUpdateApiParams = {
    updatedResource: Omit<Employee, 'employeeId'>
    resourceId: EmployeeId
}

export type EmployeeDeleteApiParams = {
    resourceId: EmployeeId
}
