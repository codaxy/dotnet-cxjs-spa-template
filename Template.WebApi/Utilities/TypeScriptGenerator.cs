using TypeGen.Core.Generator;
using TypeGen.Core.Converters;
using TypeGen.Core.SpecGeneration;
using System.Reflection;

namespace Template.Web.Utilities;

public class TypeScriptGenerator
{
    public class ModelsGenerationSpec : GenerationSpec
    {
        public override void OnBeforeGeneration(OnBeforeGenerationArgs args)
        {
            foreach (Type type in Assembly.GetExecutingAssembly().GetTypes())
            {
                if (type.Namespace == "Template.Web.Models")
                {
                    AddClass(type);
                    Console.WriteLine(type.FullName);
                }
            }
        }
    }

    public static void GenerateTypeScriptModels()
    {
        var modules = new Dictionary<string, GenerationSpec>
        {
            { ".", new ModelsGenerationSpec() }
        };

        foreach (var module in modules)
            Task.Run(async () =>
            {
                var generator = new Generator(
                    new GeneratorOptions
                    {
                        BaseOutputDirectory = "../Template.WebClient/app/api/models/" + module.Key,
                        CreateIndexFile = false,
                        EnumStringInitializers = true,
                        FileNameConverters = new TypeNameConverterCollection()
                    }
                );
                generator.Options.EnumValueNameConverters.Add(new PascalCaseToCamelCaseConverter());
                generator.Options.EnumStringInitializersConverters.Add(
                    new PascalCaseToCamelCaseConverter()
                );
                generator.Options.CustomTypeMappings.Add("System.DateOnly", "string");
                try
                {
                    foreach (
                        var file in await generator.GenerateAsync(
                            new GenerationSpec[] { module.Value }
                        )
                    )
                    {
                        Console.WriteLine("Generated TypeScript model: " + file);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("TypeScript generation error. {0}", ex);
                }
            });
    }
}
