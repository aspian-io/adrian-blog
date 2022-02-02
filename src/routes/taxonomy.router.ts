import express from "express";
import { taxonomyCreateController } from "../controllers/taxonomies/create.controller";
import { taxonomyDeleteController } from "../controllers/taxonomies/delete.controller";
import { taxonomyDetailsController } from "../controllers/taxonomies/details.controller";
import { taxonomyEditController } from "../controllers/taxonomies/edit.controller";
import { taxonomyListController } from "../controllers/taxonomies/list.controller";
import { taxonomyCreateSchema } from "../controllers/taxonomies/validation-schemas/taxonomy-create.schema";
import { taxonomyEditSchema } from "../controllers/taxonomies/validation-schemas/taxonomy-edit.schema";
import { asyncHandler } from "../middleware/async-handler.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { requireAuth } from "../middleware/require-auth.middleware";
import { validateRequest } from "../middleware/validate-request.middleware";
import { CorePolicies } from "../models/enums/core-policies.enum";
import { TaxonomyPolicies } from "../models/enums/taxonomy-policies.enum";

export const taxonomyRouter = express.Router();

// GET: List of Taxonomies
taxonomyRouter.get(
  '/',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims_LIST, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler(taxonomyListController)
);

// GET: Get a Taxonomy by its slug
taxonomyRouter.get(
  '/details/:slug',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims_DETAILS, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler(taxonomyDetailsController)
);

// POST: Create a Taxonomy
taxonomyRouter.post(
  '/create',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims_CREATE, CorePolicies.CoreClaims_ADMIN ] ),
  taxonomyCreateSchema,
  validateRequest,
  asyncHandler(taxonomyCreateController)
);

// PUT: Edit a Taxonomy
taxonomyRouter.put(
  '/edit/:slug',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims_EDIT, CorePolicies.CoreClaims_ADMIN ] ),
  taxonomyEditSchema,
  validateRequest,
  asyncHandler(taxonomyEditController)
);

// DELETE: Delete a Taxonomy
taxonomyRouter.delete(
  '/delete/:slug',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims_DELETE, CorePolicies.CoreClaims_ADMIN ] ),
  asyncHandler(taxonomyDeleteController)
);