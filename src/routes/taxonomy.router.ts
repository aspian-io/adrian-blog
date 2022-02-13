import express from "express";
import { adminTaxonomyCreateController } from "controllers/admin-controllers/api/v1/taxonomies/create.controller";
import { adminTaxonomyDeleteController } from "controllers/admin-controllers/api/v1/taxonomies/delete.controller";
import { adminTaxonomyDetailsController } from "controllers/admin-controllers/api/v1/taxonomies/details.controller";
import { adminTaxonomyEditController } from "controllers/admin-controllers/api/v1/taxonomies/edit.controller";
import { adminTaxonomyListController } from "controllers/admin-controllers/api/v1/taxonomies/list.controller";
import { taxonomyCreateSchema } from "controllers/admin-controllers/api/v1/taxonomies/validation-schemas/taxonomy-create.schema";
import { taxonomyEditSchema } from "controllers/admin-controllers/api/v1/taxonomies/validation-schemas/taxonomy-edit.schema";
import { AccessPoliciesEnum } from "infrastructure/security/access-policies.enum";
import { asyncHandler } from "middleware/async-handler.middleware";
import { authorize } from "middleware/authorize.middleware";
import { requireAuth } from "middleware/require-auth.middleware";
import { validateRequest } from "middleware/validate-request.middleware";

export const taxonomyRouter = express.Router();

// GET: List of Taxonomies
taxonomyRouter.get(
  '/',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_LIST, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminTaxonomyListController )
);

// GET: Get a Taxonomy by its slug
taxonomyRouter.get(
  '/details/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_DETAILS, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminTaxonomyDetailsController )
);

// POST: Create a Taxonomy
taxonomyRouter.post(
  '/create',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_CREATE, AccessPoliciesEnum.Core_ADMIN ] ),
  taxonomyCreateSchema,
  validateRequest,
  asyncHandler( adminTaxonomyCreateController )
);

// PUT: Edit a Taxonomy
taxonomyRouter.put(
  '/edit/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_EDIT, AccessPoliciesEnum.Core_ADMIN ] ),
  taxonomyEditSchema,
  validateRequest,
  asyncHandler( adminTaxonomyEditController )
);

// DELETE: Delete a Taxonomy
taxonomyRouter.delete(
  '/delete/:slug',
  requireAuth,
  authorize( [ AccessPoliciesEnum.Taxonomy_DELETE, AccessPoliciesEnum.Core_ADMIN ] ),
  asyncHandler( adminTaxonomyDeleteController )
);