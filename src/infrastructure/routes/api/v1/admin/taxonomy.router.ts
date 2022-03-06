import express from "express";
import { adminTaxonomyCreateController } from "controllers/admin-controllers/api/v1/taxonomies/create.controller";
import { adminTaxonomyDeleteController } from "controllers/admin-controllers/api/v1/taxonomies/delete.controller";
import { adminTaxonomyDetailsController } from "controllers/admin-controllers/api/v1/taxonomies/details.controller";
import { adminTaxonomyEditController } from "controllers/admin-controllers/api/v1/taxonomies/edit.controller";
import { adminTaxonomyListController } from "controllers/admin-controllers/api/v1/taxonomies/list.controller";
import { taxonomyCreateSchema } from "controllers/admin-controllers/api/v1/taxonomies/validation-schemas/taxonomy-create.schema";
import { taxonomyEditSchema } from "controllers/admin-controllers/api/v1/taxonomies/validation-schemas/taxonomy-edit.schema";
import { AccessPoliciesEnum } from "infrastructure/security/access-policies.enum";
import { requireAuth } from "infrastructure/middleware/require-auth.middleware";
import { authorize } from "infrastructure/middleware/authorize.middleware";
import { asyncHandler } from "infrastructure/middleware/async-handler.middleware";
import { validateRequest } from "infrastructure/middleware/validate-request.middleware";

export const adminTaxonomyRouter = express.Router();

// GET: List of Taxonomies
adminTaxonomyRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminTaxonomyListController )
);

// GET: Get a Taxonomy by its slug
adminTaxonomyRouter.get(
  '/details/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_DETAILS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminTaxonomyDetailsController )
);

// POST: Create a Taxonomy
adminTaxonomyRouter.post(
  '/create',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_CREATE, AccessPoliciesEnum.Core_ADMIN ] ),
  taxonomyCreateSchema,
  validateRequest,
  asyncHandler( adminTaxonomyCreateController )
);

// PUT: Edit a Taxonomy
adminTaxonomyRouter.put(
  '/edit/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_EDIT, AccessPoliciesEnum.Core_ADMIN ] ),
  taxonomyEditSchema,
  validateRequest,
  asyncHandler( adminTaxonomyEditController )
);

// DELETE: Delete a Taxonomy
adminTaxonomyRouter.delete(
  '/delete/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_DELETE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminTaxonomyDeleteController )
);