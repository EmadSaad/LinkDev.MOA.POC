using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.Helpers.CRMMapper
{
    public static class CrmMapper
    {
        private static AttributesMapperCollection _attributesMapperCollection;
        private static AttributesMapperCollection AttributesMapperCollection
        {
            get
            {
                if (_attributesMapperCollection == null)
                {

                    _attributesMapperCollection = new AttributesMapperCollection();
                    _attributesMapperCollection.Add<AliasedValue, EntityReferenceItem>((x) => { return new EntityReferenceItem((EntityReference)x.Value); });
                    //_attributesMapperCollection.Add<AliasedValue, OptionSetItem>((x) => { return (OptionSetItem)x.Value; });
                    _attributesMapperCollection.Add<AliasedValue, OptionSetItem>((x) =>
                    {
                        return new OptionSetItem("", "", (OptionSetValue)x.Value);
                    });
                    _attributesMapperCollection.Add<AliasedValue, string>((x) => { return x.Value.ToString(); });
                    _attributesMapperCollection.Add<AliasedValue, Guid>((x) => { return (Guid)x.Value; });
                    _attributesMapperCollection.Add<AliasedValue, int>((x) => { return (int)x.Value; });
                    _attributesMapperCollection.Add<AliasedValue, float>((x) => { return (float)x.Value; });
                    _attributesMapperCollection.Add<AliasedValue, double>((x) => { return (double)x.Value; });
                    _attributesMapperCollection.Add<AliasedValue, DateTime>((x) => { return (DateTime)x.Value; });
                    _attributesMapperCollection.Add<EntityReferenceItem, EntityReference>((x) => { return (EntityReference)x; });
                    _attributesMapperCollection.Add<EntityReference, EntityReferenceItem>((x) => { return new EntityReferenceItem(x); });
                    _attributesMapperCollection.Add<OptionSetValue, OptionSetItem>((x) => { return new OptionSetItem("", "", x); });
                    _attributesMapperCollection.Add<OptionSetItem, OptionSetValue>((x) => { return (OptionSetValue)x; });
                    _attributesMapperCollection.Add<OptionSetValue, int>((x) => { return x.Value; });
                    _attributesMapperCollection.Add<OptionSetValue, int?>((x) => { return x.Value; });
                    _attributesMapperCollection.Add<int, OptionSetValue>((x) => { return new OptionSetValue() { Value = x }; });
                    _attributesMapperCollection.Add<int?, OptionSetValue>((x) =>
                    {
                        if (x != null)
                            return new OptionSetValue() { Value = (int)x };
                        return null;
                    });
                    _attributesMapperCollection.Add<OptionSetValueCollection, MultiSelectItem>((x) => { return new MultiSelectItem("", x); });
                    _attributesMapperCollection.Add<MultiSelectItem, OptionSetValueCollection>((x) => { return (OptionSetValueCollection)x; });
                    _attributesMapperCollection.Add<OptionSetValueCollection, List<int>>((x) =>
                    {
                        List<int> result = new List<int>();
                        foreach (OptionSetValue v in x)
                        {
                            result.Add(v.Value);
                        }
                        return result.Count > 0 ? result : null;
                    });
                    _attributesMapperCollection.Add<List<int>, OptionSetValueCollection>((x) =>
                    {
                        OptionSetValueCollection result = new OptionSetValueCollection();
                        foreach (int v in x)
                        {
                            result.Add(new OptionSetValue() { Value = v });
                        }
                        return result.Count > 0 ? result : null;
                    });
                    _attributesMapperCollection.Add<PriceItem, Money>((x) => { return new Money(x.Value); });
                    _attributesMapperCollection.Add<Money, PriceItem>((x) => { return new PriceItem(x); });
                    _attributesMapperCollection.Add<Money, decimal>((x) => { return x.Value; });
                    _attributesMapperCollection.Add<Money, int>((x) => { return (int)x.Value; });
                    _attributesMapperCollection.Add<Money, float>((x) => { return (float)x.Value; });
                    _attributesMapperCollection.Add<Money, double>((x) => { return (double)x.Value; });
                    _attributesMapperCollection.Add<decimal, Money>((x) => { return new Money(x); });
                    _attributesMapperCollection.Add<int, Money>((x) => { return new Money(x); });
                    _attributesMapperCollection.Add<float, Money>((x) => { return new Money((decimal)x); });
                    _attributesMapperCollection.Add<double, Money>((x) => { return new Money((decimal)x); });
                    _attributesMapperCollection.Add<int, int?>((x) => { return (int?)x; });
                    _attributesMapperCollection.Add<Money, decimal?>((x) => { return (decimal?)x.Value; });
                    _attributesMapperCollection.Add<Guid, Guid?>((x) => { return (Guid?)x; });
                    _attributesMapperCollection.Add<Guid, string>((x) => { return x.ToString(); });
                    _attributesMapperCollection.Add<DateTime, DateTime?>((x) => { return (DateTime?)x; });
                    _attributesMapperCollection.Add<DateTime, DateModel>((x) => { return x != DateTime.MinValue ? new DateModel(x) : null; });
                    _attributesMapperCollection.Add<DateModel, DateTime>((x) => { return x != null ? new DateTime(x.year, x.month, x.day) : DateTime.MinValue; });



                }

                return _attributesMapperCollection;
            }
        }
        private static AttributesToCrmMapperCollection _attributesToCrmMapperCollection;
        private static AttributesToCrmMapperCollection AttributesToCrmMapperCollection
        {
            get
            {
                if (_attributesToCrmMapperCollection == null)
                {
                    _attributesToCrmMapperCollection = new AttributesToCrmMapperCollection();
                    _attributesToCrmMapperCollection.Add<Excludable<string>, string>((x) => { return x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<EntityReferenceItem>, EntityReference>((x) => { return (EntityReference)x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<OptionSetItem>, OptionSetValue>((x) => { return (OptionSetValue)x.Value; });
                    //_attributesToCrmMapperCollection.Add<Excludable<int>, OptionSetValue>((x) => { return new OptionSetValue() { Value = x.Value }; });
                    _attributesToCrmMapperCollection.Add<Excludable<MultiSelectItem>, OptionSetValueCollection>((x) => { return (OptionSetValueCollection)x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<List<int>>, OptionSetValueCollection>((x) =>
                    {
                        if (x != null && x.Value.Count > 0)
                        {
                            OptionSetValueCollection result = new OptionSetValueCollection();
                            foreach (int v in x.Value)
                            {
                                result.Add(new OptionSetValue() { Value = v });
                            }
                            return result;
                        }
                        return null;
                    });
                    _attributesToCrmMapperCollection.Add<Excludable<decimal>, decimal>((x) => { return x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<int>, int>((x) => { return x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<float>, float>((x) => { return x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<double>, double>((x) => { return x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<bool>, bool>((x) => { return x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<Guid>, Guid>((x) => { return x.Value; });
                    //_attributesToCrmMapperCollection.Add<Excludable<DateTime>, DateTime>((x) => { return x.Value; });
                    //_attributesToCrmMapperCollection.Add<Excludable<DateTime?>, DateTime?>((x) => { return x.Value; });
                    _attributesToCrmMapperCollection.Add<Excludable<DateTime?>, DateModel>((x) => { return x != null && x.Value.Value != DateTime.MinValue ? new DateModel((DateTime)x.Value.Value) : null; });
                    _attributesToCrmMapperCollection.Add<Excludable<DateTime>, DateModel>((x) => { return x != DateTime.MinValue ? new DateModel(x.Value) : null; });
                    _attributesToCrmMapperCollection.Add<Excludable<DateModel>, DateTime?>((x) => { return x.Value != null ? new DateTime(x.Value.year, x.Value.month, x.Value.day) : (DateTime?)null; });


                    _attributesToCrmMapperCollection.Add<string, string>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<EntityReferenceItem, EntityReference>((x) =>
                    {

                        return x != null ? (EntityReference)x : new EntityReference();
                    });
                    _attributesToCrmMapperCollection.Add<OptionSetItem, OptionSetValue>((x) => { return (OptionSetValue)x; });
                    //_attributesToCrmMapperCollection.Add<int, OptionSetValue>((x) => { return new OptionSetValue() {Value = x }; });
                    _attributesToCrmMapperCollection.Add<MultiSelectItem, OptionSetValueCollection>((x) => { return (OptionSetValueCollection)x; });
                    _attributesToCrmMapperCollection.Add<List<int>, OptionSetValueCollection>((x) =>
                    {
                        if (x != null && x.Count > 0)
                        {
                            OptionSetValueCollection result = new OptionSetValueCollection();
                            foreach (int v in x)
                            {
                                result.Add(new OptionSetValue() { Value = v });
                            }
                            return result;
                        }
                        return null;
                    });
                    _attributesToCrmMapperCollection.Add<PriceItem, Money>((x) =>
                    {
                        if (x != null && x?.Value >= 0)
                            return new Money() { Value = x.Value };
                        return null;
                    });
                    _attributesToCrmMapperCollection.Add<Money, PriceItem>((x) => { return new PriceItem(x); });
                    _attributesToCrmMapperCollection.Add<decimal, decimal>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<Guid, Guid>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<int, int>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<int?, int?>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<decimal?, decimal?>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<float, float>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<double, double>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<bool, bool>((x) => { return x; });
                    //_attributesToCrmMapperCollection.Add<DateTime, DateTime?>((x) => { return (DateTime?)x; });
                    //_attributesToCrmMapperCollection.Add<DateTime?, object>((x) => { return x; });
                    _attributesToCrmMapperCollection.Add<DateTime, DateModel>((x) => { return x != DateTime.MinValue ? new DateModel(x) : null; });
                    _attributesToCrmMapperCollection.Add<DateTime?, DateModel>((x) => { return x != null && x != DateTime.MinValue ? new DateModel((DateTime)x) : null; });
                    _attributesToCrmMapperCollection.Add<DateModel, DateTime?>((x) => { return x != null ? new DateTime(x.year, x.month, x.day) : (DateTime?)null; });



                }

                return _attributesToCrmMapperCollection;
            }
        }
        public static T ConvertToT<T>(this Entity entity, string alias = "")
        {
            if (!string.IsNullOrWhiteSpace(alias))
                alias = alias + ".";

            var type = typeof(T);
            var contract = (T)Activator.CreateInstance(type);

            var propertyDict = type.GetProperties();

            foreach (var prop in propertyDict)
            {
                string probAlias = alias;
                var propertyAttributes = Attribute.GetCustomAttributes(prop);

                foreach (var item in propertyAttributes)
                {
                    if (item is CrmFieldLogicalNameAttribute)
                    {
                        string innerAlias = string.Empty;
                        var crmFieldLogicalNameAttibute = item as CrmFieldLogicalNameAttribute;

                        var entityRefrenceCodeAttribute = propertyAttributes.Where(x => x is CrmEntityRefrenceCodeLogicalNameAtrribute).FirstOrDefault();
                        string logicalNameToGet = crmFieldLogicalNameAttibute.FieldLogicalName;
                        if (entityRefrenceCodeAttribute != null)
                        {
                            var entityRefLogicalName = entityRefrenceCodeAttribute as CrmEntityRefrenceCodeLogicalNameAtrribute;
                            innerAlias = $"{entityRefLogicalName.Alias}.";
                            logicalNameToGet = entityRefLogicalName.FieldLogicalName;
                        }
                        if (!string.IsNullOrWhiteSpace(innerAlias))
                            probAlias = innerAlias;

                        if (entity.Contains($"{probAlias}{logicalNameToGet}"))
                        {
                            var tmp = entity[$"{probAlias}{logicalNameToGet}"];
                            prop.SetValue(contract, AttributesMapperCollection.Convert(tmp.GetType(), prop.PropertyType, tmp));
                        }
                    }
                    else if (item is CrmEntityLogicalIdAttribute)
                    {
                        prop.SetValue(contract, Convert.ChangeType(entity.Id, prop.PropertyType));
                    }
                    else if (item is CrmFormattedValueAtrribute)
                    {
                        var crmFommatedValueAtrribute = item as CrmFormattedValueAtrribute;

                        if (entity.FormattedValues.Contains(crmFommatedValueAtrribute.LogicalName))
                        {
                            var tmp = entity.FormattedValues[crmFommatedValueAtrribute.LogicalName].ToString();
                            prop.SetValue(contract, tmp);
                        }

                    }

                }
            }
            return contract;
        }

        public static object LookupsMapper(this Entity entity, object customModel, string EnglishFieldName, string ArabicFieldName, string valueField = "", string nameField = "", List<string> concatName = null)
        {
            var contract = Activator.CreateInstance(customModel.GetType());
            var props = customModel.GetType().GetProperties();

            foreach (var prop in props)
            {
                if (prop.Name.ToLower() == "value" && string.IsNullOrEmpty(valueField))
                {
                    prop.SetValue(contract, Convert.ChangeType(entity.Id.ToString(), prop.PropertyType));
                    continue;
                }
                else if (prop.Name.ToLower() == "value" && !string.IsNullOrEmpty(valueField) && entity.Attributes.Contains(valueField))
                {
                    var tmp = entity[valueField];
                    prop.SetValue(contract, AttributesMapperCollection.Convert(tmp.GetType(), prop.PropertyType, tmp));
                    continue;
                }
                else if (prop.Name.ToLower() == "text")
                {
                    if (concatName != null)
                    {
                        string name = string.Empty;
                        for (int i = 0; i < concatName.Count; i++)
                        {
                            if (entity.Attributes.Contains(concatName[i]))
                            {
                                name += AttributesMapperCollection.Convert(entity[concatName[i]].GetType(), prop.PropertyType, entity[concatName[i]]);

                                if (i < concatName.Count - 1)
                                    name += "-";
                            }

                        }
                        prop.SetValue(contract, name);
                    }
                    else
                    {
                        if (ArabicFieldName != null && entity.Attributes.Contains(ArabicFieldName))
                        {
                            var tmp = entity[ArabicFieldName];
                            prop.SetValue(contract, AttributesMapperCollection.Convert(tmp.GetType(), prop.PropertyType, tmp));
                        }
                        else if (EnglishFieldName != null && entity.Attributes.Contains(EnglishFieldName))
                        {
                            var tmp = entity[EnglishFieldName];
                            prop.SetValue(contract, AttributesMapperCollection.Convert(tmp.GetType(), prop.PropertyType, tmp));
                        }
                        else if (nameField != null && entity.Attributes.Contains(nameField))
                        {
                            var tmp = entity[nameField];
                            prop.SetValue(contract, AttributesMapperCollection.Convert(tmp.GetType(), prop.PropertyType, tmp));
                        }
                    }

                    continue;
                }
                var propertyAttributes = Attribute.GetCustomAttributes(prop);

                foreach (var item in propertyAttributes)
                {
                    if (item is CrmFieldLogicalNameAttribute)
                    {
                        var crmFieldLogicalNameAttibute = item as CrmFieldLogicalNameAttribute;

                        if (entity.Contains(crmFieldLogicalNameAttibute.FieldLogicalName))
                        {
                            var tmp = entity[crmFieldLogicalNameAttibute.FieldLogicalName];
                            prop.SetValue(contract, AttributesMapperCollection.Convert(tmp.GetType(), prop.PropertyType, tmp));
                        }
                    }
                    else if (item is CrmEntityLogicalIdAttribute)
                    {
                        prop.SetValue(contract, Convert.ChangeType(entity.Id, prop.PropertyType));
                    }
                    else if (item is CrmFormattedValueAtrribute)
                    {
                        var crmFommatedValueAtrribute = item as CrmFormattedValueAtrribute;

                        if (entity.FormattedValues.Contains(crmFommatedValueAtrribute.LogicalName))
                        {
                            var tmp = entity.FormattedValues[crmFommatedValueAtrribute.LogicalName].ToString();
                            prop.SetValue(contract, tmp);
                        }

                    }
                    else if (item is CrmEntityRefrenceCodeLogicalNameAtrribute)
                    {
                        var crmEntityRefrenceCodeLogicalNameAtrribute = item as CrmEntityRefrenceCodeLogicalNameAtrribute;

                        if (entity.Contains($"{crmEntityRefrenceCodeLogicalNameAtrribute.Alias}.{crmEntityRefrenceCodeLogicalNameAtrribute.FieldLogicalName}"))
                        {
                            var tmp = entity[$"{crmEntityRefrenceCodeLogicalNameAtrribute.Alias}.{crmEntityRefrenceCodeLogicalNameAtrribute.FieldLogicalName}"];
                            prop.SetValue(contract, AttributesMapperCollection.Convert(tmp.GetType(), prop.PropertyType, tmp));
                        }
                    }
                }
            }
            return contract;
        }

        //public static Entity ConvertToEntity<T>(T contract)
        //{
        //	var entity = new Entity();
        //	var type = typeof(T);
        //	var propertyDict = type.GetProperties();

        //	var entityLogicalName =
        //		type.GetCustomAttributes(typeof(CrmEntityLogicalNameAttribute), false)
        //		.Where(x => x is CrmEntityLogicalNameAttribute)
        //		.Select(x => ((CrmEntityLogicalNameAttribute)x).LogicalName)
        //		.FirstOrDefault();

        //	if (!string.IsNullOrEmpty(entityLogicalName))
        //		entity.LogicalName = entityLogicalName;

        //	foreach (var prop in propertyDict)
        //	{
        //		var propertyAttributes = Attribute.GetCustomAttributes(prop);
        //		var propValue = prop.GetValue(contract);
        //		foreach (var item in propertyAttributes)
        //		{
        //			if (item is CrmFieldLogicalNameAttribute)
        //			{
        //				var crmFieldLogicalNameAttibute = item as CrmFieldLogicalNameAttribute;

        //				if (propValue is IExcludable)
        //				{
        //					var iExcludableObj = propValue as IExcludable;
        //					if (iExcludableObj.IsDirty && !iExcludableObj.HasValue)
        //					{
        //						entity[crmFieldLogicalNameAttibute.FieldLogicalName] = null;
        //					}
        //					else if (iExcludableObj.IsDirty)
        //					{
        //						var catedObj = AttributesToCrmMapperCollection.Convert(prop.PropertyType, propValue);
        //						var entityRefrenceAttribute = propertyAttributes.Where(x => x is CrmEntityRefrenceLogicalNameAtrribute).FirstOrDefault();
        //						if (entityRefrenceAttribute != null)
        //						{
        //							var entityRefLogicalName = entityRefrenceAttribute as CrmEntityRefrenceLogicalNameAtrribute;
        //							entity[crmFieldLogicalNameAttibute.FieldLogicalName] =
        //								new EntityReference()
        //								{
        //									LogicalName = entityRefLogicalName.LogicalName,
        //									Id = ((EntityReference)catedObj).Id
        //								};
        //						}
        //						else
        //						{
        //							entity[crmFieldLogicalNameAttibute.FieldLogicalName] = catedObj;
        //						}

        //					}
        //				}
        //			}
        //			else if (item is CrmEntityLogicalIdAttribute)
        //			{
        //				prop.SetValue(contract, Convert.ChangeType(entity.Id, prop.PropertyType));
        //			}
        //		}
        //	}
        //	return entity;
        //}

        //public static Entity ConvertToEntity<T>(T contract)
        //{
        //	var entity = new Entity();
        //	var type = typeof(T);
        //	var propertyDict = type.GetProperties();

        //	var entityLogicalName =
        //		type.GetCustomAttributes(typeof(CrmEntityLogicalNameAttribute), false)
        //		.Where(x => x is CrmEntityLogicalNameAttribute)
        //		.Select(x => ((CrmEntityLogicalNameAttribute)x).LogicalName)
        //		.FirstOrDefault();

        //	if (!string.IsNullOrEmpty(entityLogicalName))
        //		entity.LogicalName = entityLogicalName;

        //	foreach (var prop in propertyDict)
        //	{
        //		var propertyAttributes = Attribute.GetCustomAttributes(prop);
        //		var propValue = prop.GetValue(contract);
        //		foreach (var item in propertyAttributes)
        //		{
        //			if (item is CrmFieldLogicalNameAttribute)
        //			{
        //				var crmFieldLogicalNameAttibute = item as CrmFieldLogicalNameAttribute;

        //				var catedObj = AttributesToCrmMapperCollection.Convert(prop.PropertyType, propValue);
        //				var entityRefrenceAttribute = propertyAttributes.Where(x => x is CrmEntityRefrenceLogicalNameAtrribute).FirstOrDefault();
        //				if (entityRefrenceAttribute != null)
        //				{
        //					var entityRefLogicalName = entityRefrenceAttribute as CrmEntityRefrenceLogicalNameAtrribute;
        //					entity[crmFieldLogicalNameAttibute.FieldLogicalName] =
        //						new EntityReference()
        //						{
        //							LogicalName = entityRefLogicalName.LogicalName,
        //							Id = ((EntityReference)catedObj).Id
        //						};
        //				}
        //				else
        //				{
        //					entity[crmFieldLogicalNameAttibute.FieldLogicalName] = catedObj;
        //				}
        //			}
        //			else if (item is CrmEntityLogicalIdAttribute)
        //			{
        //				prop.SetValue(contract, Convert.ChangeType(entity.Id, prop.PropertyType));
        //			}
        //		}
        //	}
        //	return entity;
        //}

        public static Entity ConvertToCRMEntity<T>(T contract)
        {
            var entity = new Entity();
            var type = typeof(T);
            var propertyDict = type.GetProperties();

            var entityLogicalName =
                type.GetCustomAttributes(typeof(CrmEntityLogicalNameAttribute), false)
                .Where(x => x is CrmEntityLogicalNameAttribute)
                .Select(x => ((CrmEntityLogicalNameAttribute)x).LogicalName)
                .FirstOrDefault();

            if (!string.IsNullOrEmpty(entityLogicalName))
                entity.LogicalName = entityLogicalName;

            foreach (var prop in propertyDict)
            {
                var propertyAttributes = Attribute.GetCustomAttributes(prop);
                var propValue = prop.GetValue(contract);

                foreach (var item in propertyAttributes)
                {
                    if (item is CrmFieldLogicalNameAttribute)
                    {
                        var crmFieldLogicalNameAttibute = item as CrmFieldLogicalNameAttribute;
                        var entityRefrenceAttribute = propertyAttributes.Where(x => x is CrmEntityRefrenceLogicalNameAtrribute).FirstOrDefault();
                        var entityRefrenceCodeAttribute = propertyAttributes.Where(x => x is CrmEntityRefrenceCodeLogicalNameAtrribute).FirstOrDefault();
                        var optionSetAttribute = propertyAttributes.Where(x => x is CrmoptionSetLogicalNameAtrribute).FirstOrDefault();
                        var skipMappingAtrribute = propertyAttributes.Where(x => x is CrmSkipMappingAtrribute).FirstOrDefault();
                        if (skipMappingAtrribute != null)
                            continue;

                        if (entityRefrenceAttribute != null)
                        {
                            var entityRefLogicalName = entityRefrenceAttribute as CrmEntityRefrenceLogicalNameAtrribute;
                            if (propValue != null)
                            {
                                var catedObj = AttributesToCrmMapperCollection.Convert(prop.PropertyType, propValue);
                                EntityReference catedObjEntityRef = (EntityReference)catedObj;
                                if (catedObjEntityRef != null && catedObjEntityRef.Id != null && catedObjEntityRef.Id != Guid.Empty)
                                {
                                    entity[crmFieldLogicalNameAttibute.FieldLogicalName] =
                                        new EntityReference()
                                        {
                                            LogicalName = entityRefLogicalName.LogicalName,
                                            Id = catedObjEntityRef.Id
                                        };
                                }
                            }
                            else
                            {
                                if (entity.Id != null && entity.Id != Guid.Empty)
                                    entity[crmFieldLogicalNameAttibute.FieldLogicalName] = null;
                            }
                        }
                        if (entityRefrenceCodeAttribute != null)
                        {
                            var entityRefCodeLogicalName = entityRefrenceCodeAttribute as CrmEntityRefrenceCodeLogicalNameAtrribute;
                            if (propValue != null && !string.IsNullOrWhiteSpace(propValue.ToString()))
                            {
                                entity[crmFieldLogicalNameAttibute.FieldLogicalName] = new EntityReference(entityRefCodeLogicalName.LogicalName, entityRefCodeLogicalName.FieldLogicalName, propValue);
                            }
                            else
                            {
                                if (entity.Id != null && entity.Id != Guid.Empty)
                                    entity[crmFieldLogicalNameAttibute.FieldLogicalName] = null;
                            }
                        }
                        else if (optionSetAttribute != null)
                        {
                            var optionSetLogicalName = optionSetAttribute as CrmoptionSetLogicalNameAtrribute;
                            if (propValue != null)
                            {
                                var catedObj = AttributesToCrmMapperCollection.Convert(prop.PropertyType, propValue);
                                entity[crmFieldLogicalNameAttibute.FieldLogicalName] = new OptionSetValue() { Value = (int)catedObj };
                            }
                            else
                            {
                                if (entity.Id != null && entity.Id != Guid.Empty)
                                    entity[crmFieldLogicalNameAttibute.FieldLogicalName] = null;
                            }
                        }
                        else
                        {
                            var catedObj = AttributesToCrmMapperCollection.Convert(prop.PropertyType, propValue);
                            if (catedObj != null)
                                entity[crmFieldLogicalNameAttibute.FieldLogicalName] = catedObj;
                            else
                            {
                                if (entity.Id != null && entity.Id != Guid.Empty)
                                    entity[crmFieldLogicalNameAttibute.FieldLogicalName] = catedObj;
                            }
                        }
                    }
                    else if (item is CrmEntityLogicalIdAttribute)
                    {
                        if (propValue != null)
                        {
                            entity.Id = (Guid)propValue;
                        }
                        else
                            entity.Id = Guid.Empty;
                    }
                }
            }
            return entity;
        }
    }
}
