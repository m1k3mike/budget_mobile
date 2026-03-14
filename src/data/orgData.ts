import { Employee } from '../types/employee';

export const orgData: Employee = {
  id: '1',
  name: 'Sarah Chen',
  title: 'Chief Executive Officer',
  department: 'Executive',
  email: 'sarah.chen@company.com',
  avatar: 'SC',
  children: [
    {
      id: '2',
      name: 'Michael Roberts',
      title: 'Chief Technology Officer',
      department: 'Technology',
      email: 'michael.roberts@company.com',
      avatar: 'MR',
      children: [
        {
          id: '6',
          name: 'Emily Watson',
          title: 'VP of Engineering',
          department: 'Engineering',
          email: 'emily.watson@company.com',
          avatar: 'EW',
          children: [
            {
              id: '12',
              name: 'David Park',
              title: 'Senior Software Engineer',
              department: 'Engineering',
              email: 'david.park@company.com',
              avatar: 'DP',
            },
            {
              id: '13',
              name: 'Lisa Martinez',
              title: 'Software Engineer',
              department: 'Engineering',
              email: 'lisa.martinez@company.com',
              avatar: 'LM',
            },
            {
              id: '14',
              name: 'James Wilson',
              title: 'DevOps Engineer',
              department: 'Engineering',
              email: 'james.wilson@company.com',
              avatar: 'JW',
            },
          ],
        },
        {
          id: '7',
          name: 'Alex Thompson',
          title: 'VP of Product',
          department: 'Product',
          email: 'alex.thompson@company.com',
          avatar: 'AT',
          children: [
            {
              id: '15',
              name: 'Nina Patel',
              title: 'Product Manager',
              department: 'Product',
              email: 'nina.patel@company.com',
              avatar: 'NP',
            },
            {
              id: '16',
              name: 'Chris Lee',
              title: 'UX Designer',
              department: 'Product',
              email: 'chris.lee@company.com',
              avatar: 'CL',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Jennifer Adams',
      title: 'Chief Financial Officer',
      department: 'Finance',
      email: 'jennifer.adams@company.com',
      avatar: 'JA',
      children: [
        {
          id: '8',
          name: 'Robert Kim',
          title: 'VP of Finance',
          department: 'Finance',
          email: 'robert.kim@company.com',
          avatar: 'RK',
          children: [
            {
              id: '17',
              name: 'Amanda Brown',
              title: 'Senior Accountant',
              department: 'Finance',
              email: 'amanda.brown@company.com',
              avatar: 'AB',
            },
            {
              id: '18',
              name: 'Kevin Zhang',
              title: 'Financial Analyst',
              department: 'Finance',
              email: 'kevin.zhang@company.com',
              avatar: 'KZ',
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Marcus Johnson',
      title: 'Chief Marketing Officer',
      department: 'Marketing',
      email: 'marcus.johnson@company.com',
      avatar: 'MJ',
      children: [
        {
          id: '9',
          name: 'Sophie Turner',
          title: 'VP of Marketing',
          department: 'Marketing',
          email: 'sophie.turner@company.com',
          avatar: 'ST',
          children: [
            {
              id: '19',
              name: 'Daniel Garcia',
              title: 'Marketing Manager',
              department: 'Marketing',
              email: 'daniel.garcia@company.com',
              avatar: 'DG',
            },
            {
              id: '20',
              name: 'Rachel Green',
              title: 'Content Strategist',
              department: 'Marketing',
              email: 'rachel.green@company.com',
              avatar: 'RG',
            },
          ],
        },
        {
          id: '10',
          name: 'Tom Miller',
          title: 'VP of Sales',
          department: 'Sales',
          email: 'tom.miller@company.com',
          avatar: 'TM',
          children: [
            {
              id: '21',
              name: 'Jessica White',
              title: 'Sales Manager',
              department: 'Sales',
              email: 'jessica.white@company.com',
              avatar: 'JW',
            },
            {
              id: '22',
              name: 'Brian Taylor',
              title: 'Account Executive',
              department: 'Sales',
              email: 'brian.taylor@company.com',
              avatar: 'BT',
            },
          ],
        },
      ],
    },
    {
      id: '5',
      name: 'Diana Ross',
      title: 'Chief Human Resources Officer',
      department: 'Human Resources',
      email: 'diana.ross@company.com',
      avatar: 'DR',
      children: [
        {
          id: '11',
          name: 'Peter Collins',
          title: 'VP of HR',
          department: 'Human Resources',
          email: 'peter.collins@company.com',
          avatar: 'PC',
          children: [
            {
              id: '23',
              name: 'Michelle Davis',
              title: 'HR Manager',
              department: 'Human Resources',
              email: 'michelle.davis@company.com',
              avatar: 'MD',
            },
            {
              id: '24',
              name: 'Steven Clark',
              title: 'Recruiter',
              department: 'Human Resources',
              email: 'steven.clark@company.com',
              avatar: 'SC',
            },
          ],
        },
      ],
    },
  ],
};

// Helper function to get all employees as a flat array
export const getAllEmployees = (employee: Employee): Employee[] => {
  const employees: Employee[] = [employee];
  if (employee.children) {
    employee.children.forEach((child) => {
      employees.push(...getAllEmployees(child));
    });
  }
  return employees;
};

// Helper function to find employee path
export const findEmployeePath = (
  employee: Employee,
  targetId: string,
  path: string[] = []
): string[] | null => {
  const currentPath = [...path, employee.id];
  
  if (employee.id === targetId) {
    return currentPath;
  }
  
  if (employee.children) {
    for (const child of employee.children) {
      const found = findEmployeePath(child, targetId, currentPath);
      if (found) return found;
    }
  }
  
  return null;
};
