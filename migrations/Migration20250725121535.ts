import { Migration } from '@mikro-orm/migrations';

export class Migration20250725121535 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`business_calendar\` add constraint \`business_calendar_parent_foreign\` foreign key (\`parent\`) references \`business_calendar\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`gsw_content\` add constraint \`gsw_content_parent_foreign\` foreign key (\`parent\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`gsw_content\` add constraint \`gsw_content_root_parent_foreign\` foreign key (\`root_parent\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`gsw_content_parents\` add constraint \`gsw_content_parents_GswContent_1_foreign\` foreign key (\`GswContent_1\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`gsw_content_parents\` add constraint \`gsw_content_parents_GswContent_2_foreign\` foreign key (\`GswContent_2\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`gsw_content_implicit_dependent_on\` add constraint \`gsw_content_implicit_dependent_on_GswContent_1_foreign\` foreign key (\`GswContent_1\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`gsw_content_implicit_dependent_on\` add constraint \`gsw_content_implicit_dependent_on_GswContent_2_foreign\` foreign key (\`GswContent_2\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`gsw_content_dependent_on_contents\` add constraint \`gsw_content_dependent_on_contents_GswContent_1_foreign\` foreign key (\`GswContent_1\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`gsw_content_dependent_on_contents\` add constraint \`gsw_content_dependent_on_contents_GswContent_2_foreign\` foreign key (\`GswContent_2\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`rate_type\` add constraint \`rate_type_sys_overrides_foreign\` foreign key (\`sys_overrides\`) references \`rate_type\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_batch_install_plan\` add constraint \`sys_batch_install_plan_rollback_context_foreign\` foreign key (\`rollback_context\`) references \`sys_rollback_context\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_package_dependency_m2m\` add constraint \`sys_package_dependency_m2m_sys_package_foreign\` foreign key (\`sys_package\`) references \`sys_package\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_package_dependency_m2m\` add constraint \`sys_package_dependency_m2m_dependency_foreign\` foreign key (\`dependency\`) references \`sys_package\` (\`sys_id\`) on update cascade;`);

    this.addSql(`alter table \`sys_package_dependency_item\` add constraint \`sys_package_dependency_item_package_dependency_foreign\` foreign key (\`package_dependency\`) references \`sys_package_dependency_m2m\` (\`sys_id\`) on update cascade;`);

    this.addSql(`alter table \`sys_plugins\` add constraint \`sys_plugins_batch_install_plan_foreign\` foreign key (\`batch_install_plan\`) references \`sys_batch_install_plan\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`gsw_content_implicit_plugin_dependencies\` add constraint \`gsw_content_implicit_plugin_dependencies_GswContent_foreign\` foreign key (\`GswContent\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`gsw_content_implicit_plugin_dependencies\` add constraint \`gsw_content_implicit_plugin_dependencies_SysPlugin_foreign\` foreign key (\`SysPlugin\`) references \`sys_plugins\` (\`sys_id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`gsw_content_dependent_on_plugins_ids\` add constraint \`gsw_content_dependent_on_plugins_ids_GswContent_foreign\` foreign key (\`GswContent\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`gsw_content_dependent_on_plugins_ids\` add constraint \`gsw_content_dependent_on_plugins_ids_SysPlugin_foreign\` foreign key (\`SysPlugin\`) references \`sys_plugins\` (\`sys_id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`gsw_content_dependent_on_plugins\` add constraint \`gsw_content_dependent_on_plugins_GswContent_foreign\` foreign key (\`GswContent\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`gsw_content_dependent_on_plugins\` add constraint \`gsw_content_dependent_on_plugins_SysPlugin_foreign\` foreign key (\`SysPlugin\`) references \`sys_plugins\` (\`sys_id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`sys_scope\` add constraint \`sys_scope_guided_setup_guid_foreign\` foreign key (\`guided_setup_guid\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_scope\` add constraint \`sys_scope_subscription_entitlement_foreign\` foreign key (\`subscription_entitlement\`) references \`sys_subscription_entitlement\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_scope\` add constraint \`sys_scope_license_foreign\` foreign key (\`license\`) references \`sys_subscription\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_metadata\` add constraint \`sys_metadata_sys_scope_foreign\` foreign key (\`sys_scope\`) references \`sys_scope\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_metadata\` add constraint \`sys_metadata_sys_package_foreign\` foreign key (\`sys_package\`) references \`sys_package\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_name_index\`;`);
    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_number_ref_index\`;`);
    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_super_class_index\`;`);
    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_user_role_index\`;`);
    this.addSql(`alter table \`sys_db_object\` drop column \`number_ref\`, drop column \`super_class\`, drop column \`user_role\`;`);

    this.addSql(`alter table \`sys_db_object\` add \`glide_object_sys_id\` varchar(36) not null, add \`number_ref_sys_id\` varchar(36) null, add \`super_class_sys_id\` varchar(36) null, add \`user_role_sys_id\` varchar(36) null;`);
    this.addSql(`alter table \`sys_db_object\` modify \`name\` varchar(80) not null;`);
    this.addSql(`alter table \`sys_db_object\` add constraint \`sys_db_object_glide_object_sys_id_foreign\` foreign key (\`glide_object_sys_id\`) references \`sys_glide_object\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_db_object\` add constraint \`sys_db_object_number_ref_sys_id_foreign\` foreign key (\`number_ref_sys_id\`) references \`sys_batch_install_plan\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_db_object\` add constraint \`sys_db_object_super_class_sys_id_foreign\` foreign key (\`super_class_sys_id\`) references \`sys_db_object\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_db_object\` add constraint \`sys_db_object_user_role_sys_id_foreign\` foreign key (\`user_role_sys_id\`) references \`sys_user_role\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_db_object\` add unique \`sys_db_object_name_unique\`(\`name\`);`);
    this.addSql(`alter table \`sys_db_object\` add index \`sys_db_object_glide_object_sys_id_index\`(\`glide_object_sys_id\`);`);
    this.addSql(`alter table \`sys_db_object\` add index \`sys_db_object_number_ref_sys_id_index\`(\`number_ref_sys_id\`);`);
    this.addSql(`alter table \`sys_db_object\` add index \`sys_db_object_super_class_sys_id_index\`(\`super_class_sys_id\`);`);
    this.addSql(`alter table \`sys_db_object\` add index \`sys_db_object_user_role_sys_id_index\`(\`user_role_sys_id\`);`);

    this.addSql(`alter table \`sys_dictionary\` add constraint \`sys_dictionary_dynamic_default_value_foreign\` foreign key (\`dynamic_default_value\`) references \`sys_filter_option_dynamic\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_dictionary\` add constraint \`sys_dictionary_dynamic_ref_qual_foreign\` foreign key (\`dynamic_ref_qual\`) references \`sys_filter_option_dynamic\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_dictionary\` add constraint \`sys_dictionary_reference_foreign\` foreign key (\`reference\`) references \`sys_db_object\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_dictionary\` add constraint \`sys_dictionary_internal_type_foreign\` foreign key (\`internal_type\`) references \`sys_glide_object\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_schema_error\` add constraint \`sys_schema_error_dict_foreign\` foreign key (\`dict\`) references \`sys_dictionary\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`time_sheet_policy\` add constraint \`time_sheet_policy_default_rate_type_foreign\` foreign key (\`default_rate_type\`) references \`rate_type\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`time_sheet_policy\` add constraint \`time_sheet_policy_sys_domain_foreign\` foreign key (\`sys_domain\`) references \`sys_user_group\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`time_sheet_policy\` add constraint \`time_sheet_policy_sys_overrides_foreign\` foreign key (\`sys_overrides\`) references \`time_sheet_policy\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_building_foreign\` foreign key (\`building\`) references \`cmn_building\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_company_foreign\` foreign key (\`company\`) references \`core_company\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_cost_center_foreign\` foreign key (\`cost_center\`) references \`cmn_cost_center\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_department_foreign\` foreign key (\`department\`) references \`cmn_department\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_hr_integration_source_foreign\` foreign key (\`hr_integration_source\`) references \`sn_hr_integrations_source\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_ldap_server_foreign\` foreign key (\`ldap_server\`) references \`ldap_server_config\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_location_foreign\` foreign key (\`location\`) references \`cmn_location\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_default_perspective_foreign\` foreign key (\`default_perspective\`) references \`sys_perspective\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_schedule_foreign\` foreign key (\`schedule\`) references \`cmn_schedule\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_time_sheet_policy_foreign\` foreign key (\`time_sheet_policy\`) references \`time_sheet_policy\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user\` add constraint \`sys_user_sys_domain_foreign\` foreign key (\`sys_domain\`) references \`sys_user_group\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_update_set\` add constraint \`sys_update_set_application_foreign\` foreign key (\`application\`) references \`sys_package\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_update_set\` add constraint \`sys_update_set_base_update_set_foreign\` foreign key (\`base_update_set\`) references \`sys_update_set\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_update_set\` add constraint \`sys_update_set_batch_install_plan_foreign\` foreign key (\`batch_install_plan\`) references \`sys_batch_install_plan\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_update_set\` add constraint \`sys_update_set_completed_by_foreign\` foreign key (\`completed_by\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_update_set\` add constraint \`sys_update_set_merged_to_foreign\` foreign key (\`merged_to\`) references \`sys_update_set\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_update_set\` add constraint \`sys_update_set_parent_foreign\` foreign key (\`parent\`) references \`sys_update_set\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_update_set\` add constraint \`sys_update_set_remote_sys_id_foreign\` foreign key (\`remote_sys_id\`) references \`sys_remote_update_set\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_remote_update_set\` add constraint \`sys_remote_update_set_application_foreign\` foreign key (\`application\`) references \`sys_package\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_remote_update_set\` add constraint \`sys_remote_update_set_parent_foreign\` foreign key (\`parent\`) references \`sys_remote_update_set\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_remote_update_set\` add constraint \`sys_remote_update_set_remote_base_update_set_foreign\` foreign key (\`remote_base_update_set\`) references \`sys_remote_update_set\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_remote_update_set\` add constraint \`sys_remote_update_set_update_set_foreign\` foreign key (\`update_set\`) references \`sys_update_set\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_remote_update_set\` add constraint \`sys_remote_update_set_update_source_foreign\` foreign key (\`update_source\`) references \`sys_update_set_source\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_properties\` add constraint \`sys_properties_sys_created_by_foreign\` foreign key (\`sys_created_by\`) references \`sys_user\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_properties\` add constraint \`sys_properties_sys_updated_by_foreign\` foreign key (\`sys_updated_by\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`core_company\` add constraint \`core_company_assessment_risk_rating_foreign\` foreign key (\`assessment_risk_rating\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_engagement_risk_rating_foreign\` foreign key (\`engagement_risk_rating\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_industry_foreign\` foreign key (\`industry\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_overridden_risk_rating_foreign\` foreign key (\`overridden_risk_rating\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_parent_foreign\` foreign key (\`parent\`) references \`core_company\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_external_risk_rating_foreign\` foreign key (\`external_risk_rating\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_risk_rating_foreign\` foreign key (\`risk_rating\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_risk_tier_foreign\` foreign key (\`risk_tier\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_scoring_rule_ref_foreign\` foreign key (\`scoring_rule_ref\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_child_vendor_risk_rating_foreign\` foreign key (\`child_vendor_risk_rating\`) references \`sys_choice\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_contact_foreign\` foreign key (\`contact\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`core_company\` add constraint \`core_company_vendor_manager_foreign\` foreign key (\`vendor_manager\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`cmn_cost_center\` add constraint \`cmn_cost_center_manager_foreign\` foreign key (\`manager\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_cost_center\` add constraint \`cmn_cost_center_location_foreign\` foreign key (\`location\`) references \`cmn_location\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_cost_center\` add constraint \`cmn_cost_center_parent_foreign\` foreign key (\`parent\`) references \`cmn_cost_center\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_cost_center\` add constraint \`cmn_cost_center_sys_domain_foreign\` foreign key (\`sys_domain\`) references \`sys_user_group\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_user_group\` modify \`hourly_rate\` numeric(12,2) not null default 0;`);
    this.addSql(`alter table \`sys_user_group\` add constraint \`sys_user_group_cost_center_foreign\` foreign key (\`cost_center\`) references \`cmn_cost_center\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user_group\` add constraint \`sys_user_group_default_assignee_foreign\` foreign key (\`default_assignee\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user_group\` add constraint \`sys_user_group_manager_foreign\` foreign key (\`manager\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user_group\` add constraint \`sys_user_group_parent_foreign\` foreign key (\`parent\`) references \`sys_user_group\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_user_has_role\` add constraint \`sys_user_has_role_user_foreign\` foreign key (\`user\`) references \`sys_user\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_user_has_role\` add constraint \`sys_user_has_role_role_foreign\` foreign key (\`role\`) references \`sys_user_role\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_user_has_role\` add constraint \`sys_user_has_role_granted_by_foreign\` foreign key (\`granted_by\`) references \`sys_user_group\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user_has_role\` add constraint \`sys_user_has_role_included_in_role_foreign\` foreign key (\`included_in_role\`) references \`sys_user_role\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`sys_user_has_role\` add constraint \`sys_user_has_role_included_in_role_instance_foreign\` foreign key (\`included_in_role_instance\`) references \`sys_user_role\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`sys_user_grmember\` add constraint \`sys_user_grmember_user_foreign\` foreign key (\`user\`) references \`sys_user\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_user_grmember\` add constraint \`sys_user_grmember_group_foreign\` foreign key (\`group\`) references \`sys_user_group\` (\`sys_id\`) on update cascade;`);

    this.addSql(`alter table \`sys_group_has_role\` add constraint \`sys_group_has_role_group_foreign\` foreign key (\`group\`) references \`sys_user_group\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_group_has_role\` add constraint \`sys_group_has_role_role_foreign\` foreign key (\`role\`) references \`sys_user_role\` (\`sys_id\`) on update cascade;`);
    this.addSql(`alter table \`sys_group_has_role\` add constraint \`sys_group_has_role_granted_by_foreign\` foreign key (\`granted_by\`) references \`sys_user_group\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`cmn_location\` add constraint \`cmn_location_company_foreign\` foreign key (\`company\`) references \`core_company\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_location\` add constraint \`cmn_location_contact_foreign\` foreign key (\`contact\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_location\` add constraint \`cmn_location_source_foreign\` foreign key (\`source\`) references \`sn_hr_integrations_source\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_location\` add constraint \`cmn_location_managed_by_group_foreign\` foreign key (\`managed_by_group\`) references \`sys_user_group\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_location\` add constraint \`cmn_location_parent_foreign\` foreign key (\`parent\`) references \`cmn_location\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_location\` add constraint \`cmn_location_primary_location_foreign\` foreign key (\`primary_location\`) references \`cmn_location\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`cmn_department\` add constraint \`cmn_department_company_foreign\` foreign key (\`company\`) references \`core_company\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_department\` add constraint \`cmn_department_cost_center_foreign\` foreign key (\`cost_center\`) references \`cmn_cost_center\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_department\` add constraint \`cmn_department_dept_head_foreign\` foreign key (\`dept_head\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_department\` add constraint \`cmn_department_primary_contact_foreign\` foreign key (\`primary_contact\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_department\` add constraint \`cmn_department_parent_foreign\` foreign key (\`parent\`) references \`cmn_department\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_department\` add constraint \`cmn_department_source_foreign\` foreign key (\`source\`) references \`sn_hr_integrations_source\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`cmn_building\` add constraint \`cmn_building_contact_foreign\` foreign key (\`contact\`) references \`sys_user\` (\`sys_id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`cmn_building\` add constraint \`cmn_building_location_foreign\` foreign key (\`location\`) references \`cmn_location\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`v_plugin\` add constraint \`v_plugin_guided_setup_guid_foreign\` foreign key (\`guided_setup_guid\`) references \`gsw_content\` (\`sys_id\`) on update cascade on delete set null;`);

    this.addSql(`alter table \`v_plugin_requires\` add constraint \`v_plugin_requires_VPlugin_1_foreign\` foreign key (\`VPlugin_1\`) references \`v_plugin\` (\`sys_id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`v_plugin_requires\` add constraint \`v_plugin_requires_VPlugin_2_foreign\` foreign key (\`VPlugin_2\`) references \`v_plugin\` (\`sys_id\`) on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`business_calendar\` drop foreign key \`business_calendar_parent_foreign\`;`);

    this.addSql(`alter table \`cmn_building\` drop foreign key \`cmn_building_contact_foreign\`;`);
    this.addSql(`alter table \`cmn_building\` drop foreign key \`cmn_building_location_foreign\`;`);

    this.addSql(`alter table \`cmn_cost_center\` drop foreign key \`cmn_cost_center_manager_foreign\`;`);
    this.addSql(`alter table \`cmn_cost_center\` drop foreign key \`cmn_cost_center_location_foreign\`;`);
    this.addSql(`alter table \`cmn_cost_center\` drop foreign key \`cmn_cost_center_parent_foreign\`;`);
    this.addSql(`alter table \`cmn_cost_center\` drop foreign key \`cmn_cost_center_sys_domain_foreign\`;`);

    this.addSql(`alter table \`cmn_department\` drop foreign key \`cmn_department_company_foreign\`;`);
    this.addSql(`alter table \`cmn_department\` drop foreign key \`cmn_department_cost_center_foreign\`;`);
    this.addSql(`alter table \`cmn_department\` drop foreign key \`cmn_department_dept_head_foreign\`;`);
    this.addSql(`alter table \`cmn_department\` drop foreign key \`cmn_department_primary_contact_foreign\`;`);
    this.addSql(`alter table \`cmn_department\` drop foreign key \`cmn_department_parent_foreign\`;`);
    this.addSql(`alter table \`cmn_department\` drop foreign key \`cmn_department_source_foreign\`;`);

    this.addSql(`alter table \`cmn_location\` drop foreign key \`cmn_location_company_foreign\`;`);
    this.addSql(`alter table \`cmn_location\` drop foreign key \`cmn_location_contact_foreign\`;`);
    this.addSql(`alter table \`cmn_location\` drop foreign key \`cmn_location_source_foreign\`;`);
    this.addSql(`alter table \`cmn_location\` drop foreign key \`cmn_location_managed_by_group_foreign\`;`);
    this.addSql(`alter table \`cmn_location\` drop foreign key \`cmn_location_parent_foreign\`;`);
    this.addSql(`alter table \`cmn_location\` drop foreign key \`cmn_location_primary_location_foreign\`;`);

    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_assessment_risk_rating_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_engagement_risk_rating_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_industry_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_overridden_risk_rating_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_parent_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_external_risk_rating_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_risk_rating_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_risk_tier_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_scoring_rule_ref_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_child_vendor_risk_rating_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_contact_foreign\`;`);
    this.addSql(`alter table \`core_company\` drop foreign key \`core_company_vendor_manager_foreign\`;`);

    this.addSql(`alter table \`gsw_content\` drop foreign key \`gsw_content_parent_foreign\`;`);
    this.addSql(`alter table \`gsw_content\` drop foreign key \`gsw_content_root_parent_foreign\`;`);

    this.addSql(`alter table \`gsw_content_dependent_on_contents\` drop foreign key \`gsw_content_dependent_on_contents_GswContent_1_foreign\`;`);
    this.addSql(`alter table \`gsw_content_dependent_on_contents\` drop foreign key \`gsw_content_dependent_on_contents_GswContent_2_foreign\`;`);

    this.addSql(`alter table \`gsw_content_dependent_on_plugins\` drop foreign key \`gsw_content_dependent_on_plugins_GswContent_foreign\`;`);
    this.addSql(`alter table \`gsw_content_dependent_on_plugins\` drop foreign key \`gsw_content_dependent_on_plugins_SysPlugin_foreign\`;`);

    this.addSql(`alter table \`gsw_content_dependent_on_plugins_ids\` drop foreign key \`gsw_content_dependent_on_plugins_ids_GswContent_foreign\`;`);
    this.addSql(`alter table \`gsw_content_dependent_on_plugins_ids\` drop foreign key \`gsw_content_dependent_on_plugins_ids_SysPlugin_foreign\`;`);

    this.addSql(`alter table \`gsw_content_implicit_dependent_on\` drop foreign key \`gsw_content_implicit_dependent_on_GswContent_1_foreign\`;`);
    this.addSql(`alter table \`gsw_content_implicit_dependent_on\` drop foreign key \`gsw_content_implicit_dependent_on_GswContent_2_foreign\`;`);

    this.addSql(`alter table \`gsw_content_implicit_plugin_dependencies\` drop foreign key \`gsw_content_implicit_plugin_dependencies_GswContent_foreign\`;`);
    this.addSql(`alter table \`gsw_content_implicit_plugin_dependencies\` drop foreign key \`gsw_content_implicit_plugin_dependencies_SysPlugin_foreign\`;`);

    this.addSql(`alter table \`gsw_content_parents\` drop foreign key \`gsw_content_parents_GswContent_1_foreign\`;`);
    this.addSql(`alter table \`gsw_content_parents\` drop foreign key \`gsw_content_parents_GswContent_2_foreign\`;`);

    this.addSql(`alter table \`rate_type\` drop foreign key \`rate_type_sys_overrides_foreign\`;`);

    this.addSql(`alter table \`sys_batch_install_plan\` drop foreign key \`sys_batch_install_plan_rollback_context_foreign\`;`);

    this.addSql(`alter table \`sys_db_object\` drop foreign key \`sys_db_object_glide_object_sys_id_foreign\`;`);
    this.addSql(`alter table \`sys_db_object\` drop foreign key \`sys_db_object_number_ref_sys_id_foreign\`;`);
    this.addSql(`alter table \`sys_db_object\` drop foreign key \`sys_db_object_super_class_sys_id_foreign\`;`);
    this.addSql(`alter table \`sys_db_object\` drop foreign key \`sys_db_object_user_role_sys_id_foreign\`;`);

    this.addSql(`alter table \`sys_dictionary\` drop foreign key \`sys_dictionary_dynamic_default_value_foreign\`;`);
    this.addSql(`alter table \`sys_dictionary\` drop foreign key \`sys_dictionary_dynamic_ref_qual_foreign\`;`);
    this.addSql(`alter table \`sys_dictionary\` drop foreign key \`sys_dictionary_reference_foreign\`;`);
    this.addSql(`alter table \`sys_dictionary\` drop foreign key \`sys_dictionary_internal_type_foreign\`;`);

    this.addSql(`alter table \`sys_group_has_role\` drop foreign key \`sys_group_has_role_group_foreign\`;`);
    this.addSql(`alter table \`sys_group_has_role\` drop foreign key \`sys_group_has_role_role_foreign\`;`);
    this.addSql(`alter table \`sys_group_has_role\` drop foreign key \`sys_group_has_role_granted_by_foreign\`;`);

    this.addSql(`alter table \`sys_metadata\` drop foreign key \`sys_metadata_sys_scope_foreign\`;`);
    this.addSql(`alter table \`sys_metadata\` drop foreign key \`sys_metadata_sys_package_foreign\`;`);

    this.addSql(`alter table \`sys_package_dependency_item\` drop foreign key \`sys_package_dependency_item_package_dependency_foreign\`;`);

    this.addSql(`alter table \`sys_package_dependency_m2m\` drop foreign key \`sys_package_dependency_m2m_sys_package_foreign\`;`);
    this.addSql(`alter table \`sys_package_dependency_m2m\` drop foreign key \`sys_package_dependency_m2m_dependency_foreign\`;`);

    this.addSql(`alter table \`sys_plugins\` drop foreign key \`sys_plugins_batch_install_plan_foreign\`;`);

    this.addSql(`alter table \`sys_properties\` drop foreign key \`sys_properties_sys_created_by_foreign\`;`);
    this.addSql(`alter table \`sys_properties\` drop foreign key \`sys_properties_sys_updated_by_foreign\`;`);

    this.addSql(`alter table \`sys_remote_update_set\` drop foreign key \`sys_remote_update_set_application_foreign\`;`);
    this.addSql(`alter table \`sys_remote_update_set\` drop foreign key \`sys_remote_update_set_parent_foreign\`;`);
    this.addSql(`alter table \`sys_remote_update_set\` drop foreign key \`sys_remote_update_set_remote_base_update_set_foreign\`;`);
    this.addSql(`alter table \`sys_remote_update_set\` drop foreign key \`sys_remote_update_set_update_set_foreign\`;`);
    this.addSql(`alter table \`sys_remote_update_set\` drop foreign key \`sys_remote_update_set_update_source_foreign\`;`);

    this.addSql(`alter table \`sys_schema_error\` drop foreign key \`sys_schema_error_dict_foreign\`;`);

    this.addSql(`alter table \`sys_scope\` drop foreign key \`sys_scope_guided_setup_guid_foreign\`;`);
    this.addSql(`alter table \`sys_scope\` drop foreign key \`sys_scope_subscription_entitlement_foreign\`;`);
    this.addSql(`alter table \`sys_scope\` drop foreign key \`sys_scope_license_foreign\`;`);

    this.addSql(`alter table \`sys_update_set\` drop foreign key \`sys_update_set_application_foreign\`;`);
    this.addSql(`alter table \`sys_update_set\` drop foreign key \`sys_update_set_base_update_set_foreign\`;`);
    this.addSql(`alter table \`sys_update_set\` drop foreign key \`sys_update_set_batch_install_plan_foreign\`;`);
    this.addSql(`alter table \`sys_update_set\` drop foreign key \`sys_update_set_completed_by_foreign\`;`);
    this.addSql(`alter table \`sys_update_set\` drop foreign key \`sys_update_set_merged_to_foreign\`;`);
    this.addSql(`alter table \`sys_update_set\` drop foreign key \`sys_update_set_parent_foreign\`;`);
    this.addSql(`alter table \`sys_update_set\` drop foreign key \`sys_update_set_remote_sys_id_foreign\`;`);

    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_building_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_company_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_cost_center_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_department_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_hr_integration_source_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_ldap_server_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_location_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_default_perspective_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_schedule_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_time_sheet_policy_foreign\`;`);
    this.addSql(`alter table \`sys_user\` drop foreign key \`sys_user_sys_domain_foreign\`;`);

    this.addSql(`alter table \`sys_user_grmember\` drop foreign key \`sys_user_grmember_user_foreign\`;`);
    this.addSql(`alter table \`sys_user_grmember\` drop foreign key \`sys_user_grmember_group_foreign\`;`);

    this.addSql(`alter table \`sys_user_group\` drop foreign key \`sys_user_group_cost_center_foreign\`;`);
    this.addSql(`alter table \`sys_user_group\` drop foreign key \`sys_user_group_default_assignee_foreign\`;`);
    this.addSql(`alter table \`sys_user_group\` drop foreign key \`sys_user_group_manager_foreign\`;`);
    this.addSql(`alter table \`sys_user_group\` drop foreign key \`sys_user_group_parent_foreign\`;`);

    this.addSql(`alter table \`sys_user_has_role\` drop foreign key \`sys_user_has_role_user_foreign\`;`);
    this.addSql(`alter table \`sys_user_has_role\` drop foreign key \`sys_user_has_role_role_foreign\`;`);
    this.addSql(`alter table \`sys_user_has_role\` drop foreign key \`sys_user_has_role_granted_by_foreign\`;`);
    this.addSql(`alter table \`sys_user_has_role\` drop foreign key \`sys_user_has_role_included_in_role_foreign\`;`);
    this.addSql(`alter table \`sys_user_has_role\` drop foreign key \`sys_user_has_role_included_in_role_instance_foreign\`;`);

    this.addSql(`alter table \`time_sheet_policy\` drop foreign key \`time_sheet_policy_default_rate_type_foreign\`;`);
    this.addSql(`alter table \`time_sheet_policy\` drop foreign key \`time_sheet_policy_sys_domain_foreign\`;`);
    this.addSql(`alter table \`time_sheet_policy\` drop foreign key \`time_sheet_policy_sys_overrides_foreign\`;`);

    this.addSql(`alter table \`v_plugin\` drop foreign key \`v_plugin_guided_setup_guid_foreign\`;`);

    this.addSql(`alter table \`v_plugin_requires\` drop foreign key \`v_plugin_requires_VPlugin_1_foreign\`;`);
    this.addSql(`alter table \`v_plugin_requires\` drop foreign key \`v_plugin_requires_VPlugin_2_foreign\`;`);

    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_name_unique\`;`);
    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_glide_object_sys_id_index\`;`);
    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_number_ref_sys_id_index\`;`);
    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_super_class_sys_id_index\`;`);
    this.addSql(`alter table \`sys_db_object\` drop index \`sys_db_object_user_role_sys_id_index\`;`);
    this.addSql(`alter table \`sys_db_object\` drop column \`glide_object_sys_id\`, drop column \`number_ref_sys_id\`, drop column \`super_class_sys_id\`, drop column \`user_role_sys_id\`;`);

    this.addSql(`alter table \`sys_db_object\` add \`number_ref\` varchar(36) null, add \`super_class\` varchar(36) null, add \`user_role\` varchar(36) null;`);
    this.addSql(`alter table \`sys_db_object\` modify \`name\` varchar(36) not null;`);
    this.addSql(`alter table \`sys_db_object\` add index \`sys_db_object_name_index\`(\`name\`);`);
    this.addSql(`alter table \`sys_db_object\` add index \`sys_db_object_number_ref_index\`(\`number_ref\`);`);
    this.addSql(`alter table \`sys_db_object\` add index \`sys_db_object_super_class_index\`(\`super_class\`);`);
    this.addSql(`alter table \`sys_db_object\` add index \`sys_db_object_user_role_index\`(\`user_role\`);`);

    this.addSql(`alter table \`sys_user_group\` modify \`hourly_rate\` decimal(12,2) not null default 0.00;`);
  }

}
