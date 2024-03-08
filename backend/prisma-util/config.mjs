// @ts-check

/**
* @typedef {string | ((generator?: any) => string)} FileGeneratorConfig
* @typedef {string | ((model?: any, name?: any) => string)} FileModelConfig
* @typedef {"crossFileRelations" | "codeSchemas" | "pgtrgm" | "ignoreEmptyConditions" | "customAttributeFunctions" | "environmentLock" | "virtualEnvironment" | "middlewareContext" | "deprecatedTag" | "staticTake" | "prismaGenerators" | "refinedTypes" | "enhancedIntrospection"} OptionalFeatures
*/

/**
 * @typedef {Object} IntrospectionModel
 * 
 * @property {String} name
 * The name of this model. If this parameter hasn't been modified before, it will be the table name from the database.
 * 
 * @property {(attribute: string) => void} addAttribute
 * Add an attribute to this model.
 * 
 * attribute - The attribute to add. You can use the `schema-creator` module for a list of attributes.
 */

/**
 * @typedef {Object} ResolveConfiguration
 * 
 * @property {String} types
 * Path to the types folder relative to the folder specified in `package.json`.
 * To find out more about configuring the types folder, read {@link https://prisma-util.gitbook.io/prisma-util/modules/project-toolchain/api-documentation#types this} documentation section. 
*/

/**
 * @typedef {Object} ProjectToolchainConfiguration
 * 
 * @property {boolean} useExtensions
 * Whether Project Toolchain should use client extensions or middleware.
 * To find out more about configuring extension usage, read {@link https://prisma-util.gitbook.io/prisma-util/modules/project-toolchain/api-documentation#use-extensions this} documentation section. 
 * 
 * @property {ResolveConfiguration} resolve
 * Help Project Toolchain resolve your assets correctly.
 * To find out more about configuring resolve roots, read {@link https://prisma-util.gitbook.io/prisma-util/modules/project-toolchain/api-documentation#resolve this} documentation section. 
 * 
*/

/**
* @typedef {Object} Configuration
* 
* @property {FileModelConfig} baseSchema 
* The file that contains your generator and datasource. This path is relative to your project root.
* To find out more about configuring the base schema, read {@link https://prisma-util.gitbook.io/prisma-util/api-documentation/configuration-reference/base-schema this} documentation section.
* 
* @property {FileModelConfig[]} includeFiles
* Files in this array will be merged in to the final schema by Prisma Util. 
* To find out more about configuring the included files, read {@link https://prisma-util.gitbook.io/prisma-util/api-documentation/configuration-reference/include-files this} documentation section.
* 
* @property {string[]?} [excludeModels]
* This array uses the `file:model` association defined in the Prisma Util concepts. Models in this array will be excluded from the final build.
* To find out more about configuring the excluded models, read {@link https://prisma-util.gitbook.io/prisma-util/api-documentation/configuration-reference/exclude-models this} documentation section.
* 
* @property {OptionalFeatures[]} optionalFeatures
* Allows you to enable optional features to supercharge your Prisma Util setup.
* To find out more about configuring optional features, read {@link https://prisma-util.gitbook.io/prisma-util/api-documentation/configuration-reference/optional-features this} documentation section.
*
* @property {{[fileModel: string]: string}?} [extended]
* Create model inheritance within Prisma! The model defined by the value of this key-value entry will receive all non-id non-relation fields from the model defined by the key.
* To find out more about configuring model inheritance, read {@link https://prisma-util.gitbook.io/prisma-util/api-documentation/configuration-reference/extend-models this} documentation section.
*
* @property {ProjectToolchainConfiguration} toolchain
* Project toolchain configuration block.
* To find out more about configuring Project Toolchain, read {@link https://prisma-util.gitbook.io/prisma-util/api-documentation/configuration-reference/toolchain this} documentation section.
*/

/**
 * @type {Configuration}
 */
import { constantModel } from "prisma-util/schema-creator";

const Admin = constantModel("prisma/admin.prisma")
const Mod = constantModel("prisma/mod.prisma");
const User = constantModel("prisma/user.prisma")
const Store = constantModel("prisma/store.prisma");
const Coupon = constantModel("prisma/coupon.prisma")
const Feedback = constantModel("prisma/feedback.prisma");
const Quest = constantModel("prisma/quest.prisma")
const Reward = constantModel("prisma/reward.prisma")
const UserPoint = constantModel("prisma/userpoint.prisma")
const PointHistory = constantModel("prisma/point_history.prisma")

export default {
    optionalFeatures: [],
    includeFiles: [
        Admin,
        Mod,
        User,
        Store,
        Coupon,
        Feedback,
        Quest,
        Reward,
        UserPoint,
        PointHistory
    ],
    baseSchema: 'prisma/base.prisma',
    toolchain: {
        useExtensions: false,
        resolve: {
            types: './types',
        },
    },
};