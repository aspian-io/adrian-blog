import { PasswordUtil } from "infrastructure/security/password-util.infra";
import { AccessPoliciesEnum } from "infrastructure/security/access-policies.enum";

export const usersData = async () => [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@test.com',
    password: await PasswordUtil.hash( '123456' ),
    createdByIp: '::1',
    lastIp: '::1',
    claims: [ AccessPoliciesEnum.Core_ADMIN ],
    userAgent: "SEEDED"
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'user@test.com',
    password: await PasswordUtil.hash( '123456' ),
    createdByIp: '::1',
    lastIp: '::1',
    claims: [ AccessPoliciesEnum.Core_USER ],
    userAgent: "SEEDED"
  }
];